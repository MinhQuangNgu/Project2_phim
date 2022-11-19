const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./routes/index");
const Movie = require("./model/Movie");

dotenv.config();

dotenv.config();
app.use(express.json());

var allowedDomains = [
    "sttruyen.xyz",
    "https://sttruyen.xyz",
    "www.sttruyen.xyz",
    "http://sttruyen.xyz",
    "http://www.sttruyen.xyz",
    "https://www.sttruyen.xyz",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedDomains.indexOf(origin) === -1) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

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
