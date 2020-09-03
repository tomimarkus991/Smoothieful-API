const express = require("express");
const app = express();
let path = require("path");
const connectDB = require("./config/db");

// Connect Database
connectDB();

app.use(express.json());
// Init Middleware
app.use(express.static("public"));

// Define Routes
app.use("/api/smoothies", require("./src/routes/smoothies"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

// Set Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`));
