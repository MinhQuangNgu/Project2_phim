const Kind = require("../model/Kind");

class kindController {
    async getKinds(req, res) {
        try {
            const kinds = await Kind.find();
            res.status(200).json({ kinds });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new kindController();
