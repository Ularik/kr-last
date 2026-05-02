
import mongoose from "mongoose";
import { Types } from "mongoose";
import UserOrm from "./User";
import CafeOrm from "./Cafe";

const CafeRatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      validate: {
        validator: async (value: mongoose.Types.ObjectId) => {
          const user = await UserOrm.findById(value);
          return !!user;
        },
        message: "user does not exist!",
      },
    },
    cafe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cafe",
      required: true,
      validate: {
        validator: async (value: mongoose.Types.ObjectId) => {
          const cafe = await CafeOrm.findById(value);
          return !!cafe;
        },
        message: "cafe does not exist!",
      },
    },
    description: {
      type: String,
      required: true,
    },
    food: {
      type: Number,
      required: true,
    },
    service: {
      type: Number,
      required: true,
    },
    interior: {
      type: Number,
      required: true,
    },
    overal: {
      type: Number,
    },
  },
  { timestamps: true },
);

CafeRatingSchema.pre("save", async function () {
  this.overal = (this.food + this.service + this.interior) / 3;
});

const CafeRatingsOrm = mongoose.model("CafeRating", CafeRatingSchema);
export default CafeRatingsOrm;
