import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/userdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});


const user = mongoose.model("user", userSchema);
export default user;
