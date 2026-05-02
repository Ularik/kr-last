import mongoose from "mongoose";
import config from "./config";
import UserOrm from "./models/User";
import CafeOrm from "./models/Cafe";
import CafeRatingsOrm from "./models/CafeRatings";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  const collections = ["users", "cafes", "caferatings"]; 

  for (const collectionName of collections) {
    try {
      await db.dropCollection(collectionName);
    } catch (e) {
      console.log(
        `Collection ${collectionName} was not present, skipping drop...`,
      );
    }
  }

  const admin = new UserOrm({
    username: "admin",
    password: "admin",
    confirmPassword: "admin",
    avatar: "fixtures/omnimen.webp",
    role: "admin",
  });
  admin.generateToken();
  await admin.save();

  const user = new UserOrm({
    username: "user",
    password: "user",
    confirmPassword: "user",
    avatar: "fixtures/Edd_Sheeran.webp",
    role: "user",
  });
  user.generateToken();
  await user.save();

  const cafeOne = new CafeOrm({
    title: "Burger Joint",
    description: "The best burgers in town curated by admin",
    user: admin._id,
    images: ["fixtures/rib-eye-raw-meat-steak.webp"],
    isAgree: true,
  });
  await cafeOne.save();

  const cafeTwo = new CafeOrm({
    title: "Coffee House",
    description: "Quiet place for work and study",
    user: user._id,
    images: ["fixtures/апельсиновый-сок-брызг.webp"],
    isAgree: true,
  });
  await cafeTwo.save();

  await CafeRatingsOrm.create([
    {
      user: admin._id,
      cafe: cafeTwo._id,
      description: "Great atmosphere, but coffee was cold.",
      food: 3,
      service: 5,
      interior: 5,
    },
    {
      user: user._id,
      cafe: cafeOne._id,
      description: "Meat is perfect! Will come back again.",
      food: 5,
      service: 4,
      interior: 4,
    },
    {
      user: user._id,
      cafe: cafeTwo._id,
      description: "Normal coffee shop.",
      food: 4,
      service: 4,
      interior: 3,
    },
  ]);

  console.log("Fixtures created successfully!");
  await db.close();
};

run().catch(console.error);
