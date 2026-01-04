const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

require("./models/associations");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/volunteers", volunteerRoutes);
app.use("/events", eventRoutes);
app.use("/announcements", announcementRoutes);
app.use("/volunteers", volunteerRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// 🔴 Error middleware MUST be last
app.use(errorMiddleware);

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(5000, () =>
    console.log("Backend running on port 5000")
  );
});
