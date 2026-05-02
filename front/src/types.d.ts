export interface User {
  _id: string;
  username: string;
  role: string;
  avatar: string;
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
  user: string;
  images: string[];
}

export interface Rating {
  _id: string;
  user: string;
  cafe: string;
  food: number;
  service: number;
  interior: number;
  overal: number;
  createdAt: Date;
}