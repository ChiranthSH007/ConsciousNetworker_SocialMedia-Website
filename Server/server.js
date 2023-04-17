require("./db/conn");
const express = require("express");
const User = require("./model/schema");
require("./db/conn");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "dakjhdua5d6ab23j4g2387";
const CLIENT_ID = "daf0a114d4dac5dc9a75";
const CLIENT_SECRET = "d326a97d875feb179c5f4cd4df76cda5d8b9c9d8";

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //add to avoid CORS error
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const Post = require("./model/NewPost");
const Events = require("./model/NewEvent");

//const authrouter = require('./routes/user');

// app.use("/uploads", express.static(__dirname + "/uploads"));
// // app.use(cookieParser());

app.get("/getGitAccessTokenUserdata", async (req, res) => {
  const authname = "GitHub";

  const accesstoken = req.query.code;
  console.l0g(req.query.code);
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      console.log(data);
      await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          console.log(data);
          const email = data.email;
          const username = data.name;
          const picture = data.avatar_url;
          if (data.name != null || data.name != "") {
            const user = await User.find({ authname })
              .findOne({ email })
              .exec();
            console.log(user);
            if (user) {
              console.log("In User");
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
                authname,
                accesstoken,
                email,
                picture,
                password,
              });
              if (userDocs) {
                const users = await User.find({ authname })
                  .findOne({ email })
                  .exec();
                console.log(users);
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
        });
    });
});

app.post("/facebookauth", async (req, res) => {
  const { userObj } = req.body;
  // console.log(userObj);
  if (userObj) {
    const email = userObj.email;
    const username = userObj.name;
    const picture = userObj.picture.data.url;
    const access_token = userObj.accessToken;

    const authname = "Facebook";

    const user = await User.find({ authname }).findOne({ email }).exec();
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
        authname,
        access_token,
        email,
        picture,
        password,
      });
      if (userDocs) {
        const users = await User.find({ authname }).findOne({ email }).exec();
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
});

// app.get("/getGitUserData", async (req, res) => {
//   req.get("Authorization");
//   await fetch("https://api.github.com/user", {
//     method: "GET",
//     headers: {
//       Authorization: req.get("Authorization"),
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     });
// });

app.post("/googleauth", async (req, res) => {
  const { userObj, access_token } = req.body;
  // console.log(userObj, access_token);
  if (userObj) {
    const email_verified = userObj.email_verified;
    const email = userObj.email;
    const username = userObj.name;
    const picture = userObj.picture;
    const authname = "Google";

    if (email_verified) {
      const user = await User.find({ authname }).findOne({ email }).exec();
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
          authname,
          access_token,
          email,
          picture,
          password,
        });
        if (userDocs) {
          const users = await User.find({ authname }).findOne({ email }).exec();
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
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    console.log(info);
    console.log("successful");
    res.json(info);
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Cooke Cleared");
});

// app.post("/newpost", uploadMiddleware.single("file"), async (req, res) => {
//   const { originalname, path } = req.file;
//   const parts = originalname.split(".");
//   const ext = parts[parts.length - 1];
//   const newPath = path + "." + ext;
//   fs.renameSync(path, newPath);

//   const { userpost } = req.body;
//   const postDoc = await Post.create({
//     userpost,
//     img: newPath,
//   });
//   res.json(postDoc);
// });

app.post("/newpost", async (req, res) => {
  const { title, desc, categ, authorname, authorpic, image } = req.body;
  try {
    const postDoc = await Post.create({
      title: title,
      description: desc,
      category: categ,
      authorname: authorname,
      authorpic: authorpic,
      image: image,
    });
    postDoc.save();
    res.json(postDoc);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getpost", async (req, res) => {
  res.json(await Post.find());
});

app.post("/newevent", async (req, res) => {
  const {
    usereventcategory,
    usereventduration,
    userevententryage,
    usereventlanguage,
    usereventlean,
    usereventorgname,
    usereventname,
    usereventdescription,
    usereventlocation,
    usereventtime,
    image,
    usereventorggmail,
  } = req.body;
  const eventDoc = await Events.create({
    usereventname,
    usereventdescription,
    usereventlocation,
    usereventtime,
    eventimg: image,
    usereventorggmail,
    usereventduration,
    userevententryage,
    usereventlanguage,
    usereventlean,
    usereventorgname,
    usereventcategory,
  });
  res.json(eventDoc);
});
app.post("/newregister", async (req, res) => {
  const { eid, uid } = req.body;
  const findStat = await Events.findOne({ _id: eid }).findOne({
    usersregisterd: uid,
  });
  if (findStat == null) {
    const updtaeregDoc = await Events.updateOne(
      { _id: eid },
      { $push: { usersregisterd: uid } }
    );
    res.json(updtaeregDoc);
  } else {
    res.json();
  }
});
app.post("/checkreg", async (req, res) => {
  const { eid, uid } = req.body;
  const checkR = await Events.findOne({ _id: eid }).findOne({
    usersregisterd: uid,
  });
  res.json(checkR);
});
app.get("/getevent", async (req, res) => {
  res.json(await Events.find());
});

// populate should be add or can use cookies
app.get("/newevent/:id", async (req, res) => {
  const { id } = req.params;
  const eventDoc = await Events.findById(id);
  res.json(eventDoc);
});

app.listen(4000, function () {
  console.log("listening on port 4000!");
});

// app.use(cookieParser(), function(req, res, next) {
//   let token = req.cookies.myCookieName;
//   if (token && verify(token)) {
//       next();
//   } else {
//       res.redirect('/login');
//   }
// });

// login: 'ChiranthSH007',
//   id: 67058139,
//   node_id: 'MDQ6VXNlcjY3MDU4MTM5',
//   avatar_url: 'https://avatars.githubusercontent.com/u/67058139?v=4',
//   gravatar_id: '',
//   url: 'https://api.github.com/users/ChiranthSH007',
//   html_url: 'https://github.com/ChiranthSH007',
//   followers_url: 'https://api.github.com/users/ChiranthSH007/followers',
//   following_url: 'https://api.github.com/users/ChiranthSH007/following{/other_user}',
//   gists_url: 'https://api.github.com/users/ChiranthSH007/gists{/gist_id}',
//   starred_url: 'https://api.github.com/users/ChiranthSH007/starred{/owner}{/repo}',
//   subscriptions_url: 'https://api.github.com/users/ChiranthSH007/subscriptions',
//   organizations_url: 'https://api.github.com/users/ChiranthSH007/orgs',
//   repos_url: 'https://api.github.com/users/ChiranthSH007/repos',
//   events_url: 'https://api.github.com/users/ChiranthSH007/events{/privacy}',
//   received_events_url: 'https://api.github.com/users/ChiranthSH007/received_events',
//   type: 'User',
//   site_admin: false,
//   name: 'Chiranth SH',
//   company: null,
//   blog: '',
//   location: null,
//   email: 'chiranthsh007@gmail.com',
//   hireable: true,
//   bio: 'Android Developer (Flutter) && Data Science and Machine Learning Enthusiast',
//   twitter_username: 'shchiranth',
//   public_repos: 19,
//   public_gists: 0,
//   followers: 2,
//   following: 2,
//   created_at: '2020-06-17T13:03:14Z',
//   updated_at: '2023-03-24T13:05:35Z'
