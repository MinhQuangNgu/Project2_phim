const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./routes/index");

dotenv.config();

const url = "https://webmovieme.netlify.app/";

app.use(express.json());

app.use(cors({ credentials: true, origin: [url, "http://localhost:3000"] }));

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(socket);
});

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

app.listen(PORT, () => console.log("connected to port 5000"));
