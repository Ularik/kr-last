import express from "express";
import CafeOrm from "../models/Cafe";
import { Error } from "mongoose";
import type { RatingType } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";
import CafeRatingsOrm from "../models/CafeRatings";
import permit from "../middleware/peermit";

const cafeRatingRouter = express.Router();

cafeRatingRouter.post(
  "/:cafeId",
  auth,
  async (req, res, next) => {
    const { cafeId } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(cafeId as string);

  if (!cafeId || !isValidId) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const cafe = await CafeOrm.findById(cafeId);

  if (!cafe) return res.status(400).send({ error: "Cafe does not exist" });

    const { user } = req as RequestWithUser;

    const ratingData: RatingType = {
      user: user._id,
      cafe: cafe._id,
      description: req.body.description,
      food: req.body.food,
      service: req.body.service,
      interior: req.body.interior,
    };

    try {
      let rating = await CafeRatingsOrm.findOne({
        user: user._id,
        cafe: cafe._id,
      });

      if (rating) {
        console.log(rating)
        rating.set(ratingData);
      } else {
        rating = new CafeRatingsOrm(ratingData);
      }

      await rating.save();

      return res.send(rating);
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

cafeRatingRouter.get("/:cafeId", async (req, res) => {
  const { cafeId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(cafeId as string);

  if (!cafeId || !isValidId) {
    return res.status(400).send({ error: "Invalid ID" });
  }

    const result = await CafeRatingsOrm.find({cafe: cafeId}).populate("user", "username");


  return res.send(result);
});


cafeRatingRouter.delete("/:cafeId", auth, permit("admin"), async (req, res) => {
 const { cafeId } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(cafeId as string);

  if (!cafeId || !isValidId) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const cafe = await CafeOrm.findById(cafeId);

  if (!cafe) return res.status(400).send({ error: "Cafe does not exist" });

    const { user } = req as RequestWithUser;

    try {
      await CafeRatingsOrm.deleteOne({
        user: user._id,
        cafe: cafe._id,
      });
    } catch(e) {
      console.log(e);
    }

  return res.send({success: 'delete'});
});

export default cafeRatingRouter;
