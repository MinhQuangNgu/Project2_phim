const router = require("express").Router();
const movieController = require("../controller/movieController");
const middleWareController = require("../controller/middleWareController");
var cors = require("cors");
const corsOptions = require("../index");
router.get("/getone/:slug", cors(corsOptions), movieController.getOneMovie);
router.post(
    "/create",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    movieController.createMovie
);
router.put(
    "/update/:id",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    movieController.updateMovie
);
router.delete(
    "/delete/:id",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    movieController.deleteMovie
);
router.get("/watch/:slug", cors(corsOptions), movieController.updateWatching);
router.get("/", cors(corsOptions), movieController.getMovie);

module.exports = router;
