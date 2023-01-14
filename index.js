const express = require("express");
const connection = require("./config/db");
const userRouter=require("./routes/user.routes")
const noteRouter=require("./routes/note.route");
const authetication=require("./Middleware/authentication.middleware")
require("dotenv").config()
const cors=require("cors");
const app = express();
app.use(cors({
  origin:"*",
}))
app.use(express.json());


app.use("/users",userRouter)
app.use(authetication)
app.use("/notes",noteRouter)

// app.get("/", (req, res) => {
//   res.send("homepaage");
// });

// app.get("/data", (req, res) => {
//   const token = req.headers.token;
//   jwt.verify(token, "deep", (err, decoded) => {
//     if (err) {
//       res.send("invalid_token");
//       console.log(err);
//     } else {
//       res.send("data page");
//     }
//   });
// });
// app.get("/cart", (req, res) => {
//   const token = req.headers.token;
//   jwt.verify(token, "deep", (err, decoded) => {
//     if (err) {
//       res.send("invalid_token");
//       console.log(err);
//     } else {
//       res.send("data page");
//     }
//   });
// });
// app.get("/contact", (req, res) => {
//   res.send("contact paage");
// });

// app.get("/about", (req, res) => {
//   res.send("about paage");
// });



app.listen(process.env.port, async () => {
  try {
    await connection;

    console.log("connection established");
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
  console.log(`listening on port ${process.env.port}`);
});
