const router = require("express").Router();
const kindController = require("../controller/kindController");
const middleWareController = require("../controller/middleWareController");
router.delete(
    "/delete/:id",
    middleWareController.verifyAdmin,
    kindController.deleteKind
);
router.post(
    "/create",
    middleWareController.verifyAdmin,
    kindController.createKind
);
router.get("/", kindController.getKinds);

module.exports = router;
