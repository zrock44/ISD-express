require("dotenv").config();

let bodyParser = require("body-parser");
let express = require("express");
let app = express();

// console.log("Hello World");

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

const midPath = __dirname + "/public";
app.use("/public", express.static(midPath));

app.use(bodyParser.urlencoded({ extended: false }));

const absPath = __dirname + "/views/index.html";
app.get("/", (req, res) => {
  res.sendFile(absPath);
});

const myJson = {
  message: "Hello json",
};
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    myJson.message = myJson.message.toUpperCase();
  } else {
    myJson.message = "Hello json";
  }
  res.json(myJson);
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  },
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

module.exports = app;
