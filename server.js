const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;
// looks for the environment variable, if not there it takes 8000 as port
//Connect to database
connectDB();
const app = express();
//add middleware
app.use(express.json()); //this allows to send raw json
app.use(express.urlencoded({ extended: false })); //to accept the urlencoded form
app.get("/api/users", (req, res) => {
  res.status(201).json({ message: "Welcome to the Support Desk API" });
});
// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

//static files
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
