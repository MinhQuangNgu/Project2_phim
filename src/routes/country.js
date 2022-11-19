const router = require("express").Router();
const countryController = require("../controller/countryController");

const middleWareController = require("../controller/middleWareController");

router.delete(
    "/delete/:id",
    middleWareController.verifyAdmin,
    countryController.deleteCountry
);
router.post(
    "/create",
    middleWareController.verifyAdmin,
    countryController.createCountries
);
router.get("/", countryController.getCountries);

module.exports = router;
