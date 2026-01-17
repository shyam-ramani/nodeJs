import express from 'express';
import User from './models/user.js';
import Post from './models/post.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieparser from 'cookie-parser';
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieparser());

function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.redirect("/login");
    }
    else {
        let data = jwt.verify(req.cookies.token, "shyam");
        req.userId = data.userId;
        next();
    }
}
app.get('/', (req, res) => {
    res.render("index");
})
app.post('/createUser', async (req, res) => {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        res.send("User already exists");
    } else {
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let newUser = new User({
                    name,
                    email,
                    password: hash,
                });
                let token = jwt.sign({ email: email, userId: newUser._id }, "shyam");
                res.cookie("token", token);
                await newUser.save();
                res.redirect("/login");

            })
        })

    }

});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/loginUser', async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        res.send("User not found");
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: email, userId: user._id }, "shyam");
                res.cookie("token", token);
                res.render("profile", { user: user });
            } else {
                res.send("Invalid credentials");
            }
        })
    }
});

app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/Login");
})

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await User.findById(req.userId);
    await user.populate("post");
    res.render("profile", { user: user });
})
app.post('/createPost', isLoggedIn, async (req, res) => {
    let { content } = req.body;
    let user = await User.findById(req.userId);
    let newPost = new Post({
        user: user._id,
        content
    });
    await newPost.save();
    user.post.push(newPost._id);
    await user.save();
    res.redirect("/profile");
})

app.use('/like/:id', isLoggedIn, async (req, res) => {
   let post=await Post.findById(req.params.id).populate("user");
   if(post.likes.indexOf(req.userId)===-1){

       post.likes.push(req.userId);
   }else{
         post.likes.splice(post.likes.indexOf(req.userId),1);
   }
   await post.save();
   res.redirect("/profile");
});
app.use('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await Post.findById(req.params.id).populate("user");
    res.render("edit", { post: post });
});
app.post('/updatePost/:id', isLoggedIn, async (req, res) => {
    let { content } = req.body;
    let post = await Post.findById(req.params.id);
    post.content = content;
    await post.save();
    res.redirect("/profile");
})
app.listen(3000, () => {
    console.log("http://localhost:3000");
});