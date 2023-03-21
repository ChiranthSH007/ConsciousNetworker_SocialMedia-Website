const express = require("express");
const User = require("./model/schema");
require("./db/conn");

const app = express();
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //add to avoid CORS error
app.use(express.json());

//const authrouter = require('./routes/user');

//app.use(authrouter)

app.post("/googleauth", async (req, res) => {
  const { username, email } = req.body;
  const userDocs = await User.create({ username, email });
  res.json(userDocs);
});
// app.post('/test'),(req,res)=>{
//     const test = req.body;
//     console.log(test);
//     res.json('testOKOKOKOK');

// }

app.listen(4000, function () {
  console.log("listening on port 4000!");
});
