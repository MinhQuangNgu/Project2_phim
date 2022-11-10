const router = require("express").Router();
const kindController = require("../controller/kindController");

router.get("/", kindController.getKinds);

module.exports = router;
