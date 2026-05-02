export interface UserFields {
  username: string;
  password: string;
  confirmPassword: string;
  token: string;
  role: string;
  avatar?: string;
  __confirmPassword: string;
}

export interface ComingMessage {
  type: "SEND_MESSAGE" | "LOGIN" | "LOGOUT";
  user: string;
  payload: string;
}
