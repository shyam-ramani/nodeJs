import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/project1");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
});
 const User=mongoose.model("User",userSchema);
export default User;