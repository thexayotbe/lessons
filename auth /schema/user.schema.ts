import { Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});
