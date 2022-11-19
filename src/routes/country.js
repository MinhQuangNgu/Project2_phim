const router = require("express").Router();
const countryController = require("../controller/countryController");

const middleWareController = require("../controller/middleWareController");
var cors = require("cors");
const corsOptions = require("../index");
router.delete(
    "/delete/:id",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    countryController.deleteCountry
);
router.post(
    "/create",
    cors(corsOptions),
    middleWareController.verifyAdmin,
    countryController.createCountries
);
router.get("/", cors(corsOptions), countryController.getCountries);

module.exports = router;
