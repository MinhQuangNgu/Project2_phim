const router = require("express").Router();
const kindController = require("../controller/kindController");
const middleWareController = require("../controller/middleWareController");
var cors = require("cors");
const corsOptions = require("../index");
router.delete(
    "/delete/:id",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    kindController.deleteKind
);
router.post(
    "/create",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    kindController.createKind
);
router.get("/", cors(corsOptions), kindController.getKinds);

module.exports = router;
