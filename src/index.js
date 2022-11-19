const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./routes/index");
const Movie = require("./model/Movie");

dotenv.config();

dotenv.config();
app.use(express.json());
var whitelist = [
    "sttruyen.xyz",
    "https://sttruyen.xyz",
    "www.sttruyen.xyz",
    "http://sttruyen.xyz",
    "http://www.sttruyen.xyz",
    "https://www.sttruyen.xyz",
];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then((res) => {
        console.log("connection to database");
    })
    .catch((res) => {
        console.log("your error" + res);
    });

const PORT = process.env.PORT || 5000;

router(app);

app.listen(PORT, () => {
    console.log("connected to port 5000");
});

exports.module = corsOptions;
