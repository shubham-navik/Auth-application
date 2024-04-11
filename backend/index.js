const express = require("express");
const cors = require("cors");
const app = express();


require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
require("./config/database").connect(); // function from database.js

// routes ko import kro and mount kro

const user = require("./routes/user");

app.use("/api/v1", user); //route mounted


//activate server

app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
})