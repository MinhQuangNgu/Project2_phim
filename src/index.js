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

app.use(
    cors({
        credentials: true,
        origin: [
            "sttruyen.xyz",
            "https://sttruyen.xyz",
            "www.sttruyen.xyz",
            "http://sttruyen.xyz",
            "http://www.sttruyen.xyz",
            "https://www.sttruyen.xyz",
        ],
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
