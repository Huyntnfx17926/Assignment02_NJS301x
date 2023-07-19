const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const transactionRoutes = require("./routes/transaction");
const roomRoutes = require("./routes/room");

app.use(cors());
app.use(express.json());

app.use(userRoutes.route);
app.use(hotelRoutes.route);
app.use(transactionRoutes.route);
app.use(roomRoutes.route);

mongoose
  .connect(
    "mongodb+srv://admin:Huynguyen@atlascluster.syfs4fj.mongodb.net/asm2"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5000);
  })
  .catch((err) => console.log("::ERROR:", err));
