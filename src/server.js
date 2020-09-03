const express = require("express");
const app = express();
let path = require("path");
const connectDB = require("../config/db");
const bodyParser = require("body-parser");

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public/index.html"));
});
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});

// Define Routes
app.use("/api/smoothies", require("./routes/smoothies"));

app.get("/api", (req, res) => {
  res.json({ msg: "Welcome to Smoothieful API" });
});

// Define Error Route 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});
// Define Error Route 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "public/error.html"));
});

// Set Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`));
