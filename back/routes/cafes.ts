import express from "express";
import CafeOrm from "../models/Cafe";
import { Error } from "mongoose";
import config from "../config";
import { imagesUpload } from "../middleware/multer";
import { CafeCreateType } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";

const cafeRouter = express.Router();


cafeRouter.post(
  "/",
  auth,
  imagesUpload.array("images", 5),
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

    if (!req.body.isAgree)
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
  },
);

cafeRouter.get("/", async (req, res) => {
    const cafeList = await CafeOrm.find();
    return res.send(cafeList);
});


export default cafeRouter;