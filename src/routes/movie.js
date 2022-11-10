const router = require("express").Router();
const movieController = require("../controller/movieController");

router.get("/getone/:slug", movieController.getOneMoive);
router.post("/create", movieController.createMovie);
router.put("/update/:id", movieController.updateMovie);
router.delete("/delete/:id", movieController.deleteMovie);
router.get("/", movieController.getMovie);

module.exports = router;
