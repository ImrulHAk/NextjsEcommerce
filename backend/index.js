const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;
const router = require("./router");

// database connection
connectDB();

// localhost:3000
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
