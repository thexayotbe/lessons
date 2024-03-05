import mongoose from "mongoose";
import userSchema from "../schema/user.schema";

const userModel = mongoose.model("user", userSchema);
export default userModel;
