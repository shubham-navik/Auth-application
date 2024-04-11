

//monggoose k ainstance le  aao

const mongoose = require("mongoose");

require('dotenv').config();

exports.connect = () => { //  creating connect function to connect db
    mongoose.connect(process.env.MONGO_DB_URL, {
       

    })
        .then(() => { console.log("DB connected succesfully") })
        .catch((err) => {
            console.log("db connection issue");
            console.log(err);
            process.exit(1);
    })
}