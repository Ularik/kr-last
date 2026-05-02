import { Types } from "mongoose";

export interface UserFields {
  username: string;
  password: string;
  confirmPassword: string;
  token: string;
  role: string;
  avatar?: string;
  __confirmPassword: string;
}

export interface CafeCreateType {
  title: string;
  user: Types.ObjectId;
  images: string[] | null;
}

export interface RatingType {
  user: Types.ObjectId;
  cafe: Types.ObjectId;
  description: string;
  food: number;
  service: number;
  interior: number;
}