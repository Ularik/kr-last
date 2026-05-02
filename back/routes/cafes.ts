import express from "express";
import CafeOrm from "../models/Cafe";
import CafeRatingsOrm from "../models/CafeRatings";
import { Error } from "mongoose";
import { imagesUpload } from "../middleware/multer";
import { CafeCreateType, CafeWithRating } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";
import permit from "../middleware/peermit";


const cafeRouter = express.Router();


cafeRouter.post(
  "/",
  auth,
  imagesUpload.array("images", 15),
  async (req, res, next) => {
    const files = req.files as Express.Multer.File[];

    const { user } = req as RequestWithUser;

    const cafeData: CafeCreateType = {
      title: req.body.title,
      description: req.body.description,
      user: user._id,
      images: files ? files.map((file) => "images/" + file.filename) : null,
      isAgree: req.body.isAgree,
    };

    if (req.body.isAgree === 'false')
      return res.status(400).send({ error: "You must agree" });

    delete cafeData.isAgree;

    try {
        const newCafe = new CafeOrm(cafeData);
        await newCafe.save();
        return res.send(newCafe);
    } catch(e) {
        if (e instanceof Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
  }
);


cafeRouter.patch(
  "/:cafeId",
  auth,
  imagesUpload.array("images", 15),
  async (req, res, next) => {
    const files = req.files as Express.Multer.File[];

        const { cafeId } = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(cafeId as string);
    
      if (!cafeId || !isValidId) {
        return res.status(400).send({ error: "Invalid ID" });
      }
    
      const cafe = await CafeOrm.findById(cafeId);
    
      if (!cafe) return res.status(400).send({ error: "Cafe does not exist" });

    const images = files ? files.map((file) => "images/" + file.filename) : null;
    
    try {
      if (images) {
        images.forEach(image => {
          cafe.images.push(image);
        })
      }
      await cafe.save();
      return res.send(cafe);
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      }

      return next(e);
    }
  },
);


cafeRouter.get("/", async (req, res) => {
    const cafeList = await CafeOrm.find();

    const cafeListWithRate: CafeWithRating[] = [];

    for (const cafe of cafeList) {
      const cafeObj = {...cafe.toObject(), total: 0, overal: 0};
      const ratings = await CafeRatingsOrm.find({cafe: cafeObj._id});
      const total = ratings.length;
      const sumRating = ratings.reduce(
        (acc, rating) => acc + (rating.overal || 0),
        0,
      );
      cafeObj.total = total;
      cafeObj.overal = total > 0 ? Number((sumRating / total).toFixed(1)) : 0;

      cafeListWithRate.push(cafeObj);
    };

    return res.send(cafeListWithRate);
});



cafeRouter.get("/:cafeId", async (req, res) => {
  const { cafeId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(cafeId as string);

  if (!cafeId || !isValidId) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const cafe = await CafeOrm.findById(cafeId);
  if (!cafe) return res.status(400).send({error: "Cafe does not exist"});

  return res.send(cafe);
});


cafeRouter.delete("/:cafeId", auth, permit("admin"), async (req, res) => {
  const { cafeId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(cafeId as string);

  if (!cafeId || !isValidId) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  await CafeOrm.deleteOne({_id: cafeId});

  return res.send({success: "delete"});
});

export default cafeRouter;