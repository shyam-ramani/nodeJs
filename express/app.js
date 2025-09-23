import express from "express";
const app = express();
 app.use((req,res,next)=>{
   console.log("middleware");
   next();

 })
 app.get('/',(req,res)=>{
     res.send("hello world");
 })
 app.use((req,res)=>{
  res.status(400).send("Bad request");
 })


app.listen(3000, () => console.log("Listening on port 3000"));
