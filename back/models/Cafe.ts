import mongoose from "mongoose";
import { Types } from "mongoose";
import UserOrm from "./User";
import uniqueValidator from "mongoose-unique-validator";


const CafeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const user = await UserOrm.findById(value);
        return !!user; 
      },
      message: "user does not exist!",
    },
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: "At least one image is required!",
    },
  },
});

CafeSchema.plugin(uniqueValidator, {
  message: "{PATH} должно быть уникальным.",
});

const CafeOrm = mongoose.model("Cafe", CafeSchema);
export default CafeOrm;
