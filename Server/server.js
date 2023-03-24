const express = require("express");
const User = require("./model/schema");
require("./db/conn");
const app = express();
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //add to avoid CORS error
app.use(express.json());
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
const Post= require('./model/NewPost');
const postModel=require('./model/NewPost');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "dakjhdua5d6ab23j4g2387";
//const authrouter = require('./routes/user');

app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cookieParser());
app.post("/googleauth", async (req, res) => {
  const { userObj } = req.body;
  console.log(userObj);
  if (userObj) {
    const email_verified = userObj.email_verified;
    const email = userObj.email;
    const username = userObj.name;
    const picture = userObj.picture;

    if (email_verified) {
      const user = await User.findOne({ email }).exec();
      console.log(user);
      if (user) {
        jwt.sign(
          {
            uname: user.username,
            id: user.id,
            uemail: user.email,
            upic: user.picture,
          },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json("ok");
          }
        );
      } else {
        let password = bcrypt.hashSync(email + username, salt);
        const userDocs = await User.create({
          username,
          email,
          picture,
          password,
        });
        if (userDocs) {
          const users = await User.findOne({ email }).exec();
          jwt.sign(
            {
              uname: users.username,
              id: users.id,
              uemail: users.email,
              upic: users.picture,
            },
            secret,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json("ok");
            }
          );
        } else {
          return res.status.json({ error: "mongodb error" });
        }
        // let newUser = new User(name, email, picture, password);
        // console.log(newUser);
        // newUser.save((err, data) => {
        //   if (err) {
        //     return res.status.json({ error: "mongodb error" });
        //   }
        //   return res.json(data);
        // });
      }
    }
  }
  // const userDocs = await User.create({ username, email });
  //res.json(userObj);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log("successful");
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    console.log(info);
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});


app.post("/newpost", uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} =req.file;
  const parts = originalname.split('.');
  const ext=parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const{userpost} = req.body;
  const postDoc = await Post.create({
    userpost, 
    img: newPath,
  });
  res.json(postDoc);
});


app.get('/newpost', async (req, res)=>{
  res.json(await Post.find());
});

app.listen(4000, function () {
  console.log("listening on port 4000!");
});
