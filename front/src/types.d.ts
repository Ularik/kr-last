export interface User {
  _id: string;
  username: string;
  role: string;
  avatar: string;
}

export interface UserLite {
  _id: string;
  username: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Cafe {
  _id: string;
  title: string;
  description: string;
  user: string;
  images: string[];
  total: number;
  overal: number;
}

export interface CafePost {
  title: string;
  description: string;
  images: File[];
  isAgree: boolean;
}

export interface Rating {
  _id: string;
  user: UserLite;
  cafe: string;
  food: number;
  service: number;
  interior: number;
  overal: number;
  createdAt: Date;
}

export interface RatingPost {
  food: number;
  service: number;
  interior: number;
}