const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const app = express();

app.use(bodyParser.json()).use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors("Access-Control-Allow-Origin", "*"));

const mongoose = require("mongoose");
require("dotenv").config();
const MONGOURI = process.env.MONGOURI;
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  console.log("server active");
  res.send("server active");
});
require("./Routes.js")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port: " + port));
