const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./authRoutes");
const {requireAuth,checkUser}=require("./controllers/authMiddleware")
const app = express();

app.use(express.static("public"));
 app.use(express.json());
 app.use(cookieParser());
app.set("view engine", "ejs");
const uri =
  "mongodb+srv://<username>:<password>@atlascluster.tdejwh4.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then((result) =>
    app.listen(3000, () => {
      console.log("Connected");
    }) 
  )
  .catch((err) => console.log(err));
app.get("*", checkUser);

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/smoothies",requireAuth, (req, res) => {
  res.render("smoothies");
});
