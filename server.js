const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

//connect to monogodb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log("Database Connection Error: ", err));

//app middleware
app.use(bodyParser.json());

//app.use(cors());//allow all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//middleware
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Api is running on port: ${port}`);
});
