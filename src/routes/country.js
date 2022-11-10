const router = require("express").Router();
const countryController = require("../controller/countryController");

router.get("/", countryController.getCountries);

module.exports = router;
