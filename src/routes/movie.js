const router = require("express").Router();
const movieController = require("../controller/movieController");
const middleWareController = require("../controller/middleWareController");
router.get("/getone/:slug", movieController.getOneMovie);
router.post(
    "/create",
    middleWareController.verifyAdmin,
    movieController.createMovie
);
router.put(
    "/update/:id",
    middleWareController.verifyAdmin,
    movieController.updateMovie
);
router.delete(
    "/delete/:id",
    middleWareController.verifyAdmin,
    movieController.deleteMovie
);
router.get("/watch/:slug", movieController.updateWatching);
router.get("/", movieController.getMovie);

module.exports = router;
