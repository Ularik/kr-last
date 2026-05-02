import express from "express";
import UsersOrm from "../models/User";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config";
import { imagesUpload } from "../middleware/multer";

const usersRouter = express.Router();

const createAccessToken = (id: string) => {
  return jwt.sign({ _id: id }, config.jwtSecret, {
    expiresIn: "1h",
  });
};


usersRouter.post("/", imagesUpload.single("avatar"), async (req, res, next) => {
  const data = {
    username: req.body.username,
    avatar: req.file ? "images/" + req.file.filename : null,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  try {
    const user = new UsersOrm(data);
    user.generateToken();
    const saveUser = await user.save();

    res.cookie("refreshToken", saveUser.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Защита от CSRF (Cross site request forgery),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    res.cookie("accessToken", createAccessToken(saveUser._id.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Защита от CSRF (Cross site request forgery),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    return res.send({ user, message: "Register new user" });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await UsersOrm.findOne({ username: username });

    if (!user) {
      res.status(400).send({ error: "user does not exist" });
      return;
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      res.status(400).send({ error: "password not valid" });
      return;
    }

    user.generateToken();
    await user.save();

    res.cookie("refreshToken", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Защита от CSRF (Cross site request forgery),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    res.cookie("accessToken", createAccessToken(user._id.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Защита от CSRF (Cross site request forgery),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    return res.send({ user, message: "Login user" });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
  }
});

// logout
usersRouter.delete("/sessions", async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await UsersOrm.findOne({ token: refreshToken });
      if (user) {
        user.token = "";
        await user.save();
      }
    }

    res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });
    return res.send({ message: "Logged out successfully" });
  } catch (e) {
    next(e);
  }
});

// refresh token
usersRouter.post("/token", async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).send({ error: "No refresh token present" });
    }

    const decoded = jwt.verify(refreshToken, config.refreshSecret) as {
      _id: string;
    };

    const user = await UsersOrm.findOne({
      _id: decoded._id,
      token: refreshToken,
    });

    if (!user) {
      return res.status(401).send({ error: "Invalid refresh token" });
    }

    const accessToken = createAccessToken(user._id.toString());

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });
    res.send({ message: "Access token refreshed successfully" });
  } catch (e) {
    res.status(401).send({ error: "Invalid or expired refresh token" });
  }
});

export default usersRouter;
