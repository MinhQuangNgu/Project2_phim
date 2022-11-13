const router = require("express").Router();
const chapterController = require("../controller/chapterController");
const middleWareController = require("../controller/middleWareController");

router.post(
    "/create/:movieId",
    middleWareController.verifyAdmin,
    chapterController.createChapter
);
router.delete(
    "/delete/:id",
    middleWareController.verifyAdmin,
    chapterController.deleteChapter
);
router.post(
    "/update/:id",
    middleWareController.verifyAdmin,
    chapterController.updateChapter
);

module.exports = router;
