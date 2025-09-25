import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { user } from "./models/user.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const users = await user.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  const { name, email, photo } = req.body;
  const newUser = new user({ name, email, photo });
  await newUser.save();
  res.redirect("/read");
});
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await user.findByIdAndDelete(id);
  res.redirect("/read");
});
app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const foundUser = await user.findById(id);
  res.render("edit", { user: foundUser });
});

app.post("/update", async (req, res) => {
     const { id, name, email, photo } = req.body;
     await user.findByIdAndUpdate(id, { name, email, photo });
     res.redirect("/read");
})


app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
