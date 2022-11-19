const router = require("express").Router();
const chapterController = require("../controller/chapterController");
const middleWareController = require("../controller/middleWareController");
var cors = require("cors");
const corsOptions = require("../index");
router.post(
    "/create/:movieId",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    chapterController.createChapter
);
router.delete(
    "/delete/:id",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    chapterController.deleteChapter
);
router.post(
    "/update/:id",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    chapterController.updateChapter
);

module.exports = router;
