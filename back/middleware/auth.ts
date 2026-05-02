import { NextFunction, Request, Response, RequestHandler } from "express";
import { UserFields } from "../types";
import { HydratedDocument } from "mongoose";
import UsersOrm from "../models/User";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import config from "../config";

export interface RequestWithUser extends Request {
  user: HydratedDocument<UserFields>;
}

export const authOrNot: RequestHandler = async (
  expressReq: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressReq as RequestWithUser;
  const jwtToken = req.cookies.accessToken;

  if (!jwtToken) {
    return next();
  }

  try {
    const decoded = jwt.verify(jwtToken, config.jwtSecret) as { _id: string };
    const user = await UsersOrm.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(401).send({ error: "Invalid or expired access token" });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    if (e instanceof TokenExpiredError) {
      return res.status(401).send({ error: "Your token expired" });
    } else {
      return res
        .status(401)
        .send({ error: "Please authenticate. Invalid access token" });
    }
  }
};

const auth: RequestHandler = async (
  expressReq: Request,
  res: Response,
  next: NextFunction,
) => {
  await authOrNot(expressReq, res, () => {
    const req = expressReq as RequestWithUser;
    if (!req.user) {
      return res.status(401).send({ error: "Token not sent" });
    }
    next();
  });
};

export default auth;
