const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();


app.use(express.json());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});



app.use(cors({
  origin: "http://localhost:3000",
})) 

// import routes
const message = require("./message/message");

app.use("/api/message", message);



module.exports = app;