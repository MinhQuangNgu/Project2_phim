const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./routes/index");

dotenv.config();

dotenv.config();
app.use(express.json());
const url = "https://sttruyen.xyz";

app.use(
    cors({
        credentials: true,
        origin: [
            url,
            "sttruyen.xyz",
            "www.sttruyen.xyz",
            "http://sttruyen.xyz",
            "http://www.sttruyen.xyz",
            "https://www.sttruyen.xyz",
        ],
    })
);

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {});

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

http.listen(PORT, () => {
    console.log("connected to port 5000");
});
