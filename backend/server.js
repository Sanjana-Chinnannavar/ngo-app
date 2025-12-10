const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
const volunteerRoutes = require("./routes/volunteerRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());
app.use(cors());
app.use("/volunteers", volunteerRoutes);
app.use(errorMiddleware);
app.use("/events", eventRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(5000, () => console.log("Backend running on port 5000"));
});
app.use("/auth", authRoutes);
