const Country = require("../model/Country");

class countryController {
    async getCountries(req, res) {
        try {
            const countries = await Country.find();
            res.status(200).json({ countries });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    async createCountries(req, res) {
        try {
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new countryController();
