const Country = require("../model/Country");
const Movie = require("../model/Movie");

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
            const { name } = req.body;
            const country = new Country({
                name,
            });
            await country.save();
            return res.status(200).json({ msg: `Tạo thành công ${name}` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteCountry(req, res) {
        try {
            const { id } = req.params;
            const country = await Country.findById(id);
            if (!country) {
                return res.status(400).json({ msg: "Không có country này." });
            }
            Movie.updateMany(
                {},
                {
                    $pull: {
                        "country._id": country._id,
                    },
                }
            );
            await Country.findByIdAndDelete(id);
            return res.status(200).json({ msg: "Xóa thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new countryController();
