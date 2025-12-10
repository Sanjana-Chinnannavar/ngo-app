const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(5000, () => console.log("Backend running on port 5000"));
});
