import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/practice");
const userSchema= new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
})
export const user = mongoose.model("user", userSchema);