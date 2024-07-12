const express = require("express");
const cors = require("cors");
const PORT = 8080;

const app = express();

require("dotenv").config();
const db = require("./config/dbConfig");

// Middleware
app.use(cors());
app.use(express.json());

// Using the routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/users", userRoutes);
app.use("/api/event", eventRoutes);

app.listen(PORT, () => {
  console.log(`your server is running fine at ${PORT}`);
});
