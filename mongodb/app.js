import express from 'express';
import userModel from './usermodel.js';

const app = express();

app.get('/', (req, res) => {
    res.send("hello world");
});
app.get('/create', async (req, res) => {
    const user = await userModel.create({
        username: "hassan",
        email: "hassan@.com",
        password: "1234"
    })
    res.send(user);
})

app.get('/update', async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate({ username: "hassan" }, { email: "hassan@.com" }, { new: true });
    res.send(updatedUser);
})
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
