const Kind = require("../model/Kind");
const Movie = require("../model/Movie");

class kindController {
    async getKinds(req, res) {
        try {
            const kinds = await Kind.find();
            res.status(200).json({ kinds });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async createKind(req, res) {
        try {
            const { title } = req.body;
            const kind = new Kind({
                title,
            });
            await kind.save();
            return res.status(200).json({ msg: `Tạo thành công ${title}` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteKind(req, res) {
        try {
            const { id } = req.params;
            const kind = await Kind.findById(id);
            if (!kind) {
                return res.status(400).json({ msg: "Không có kind này." });
            }
            Movie.updateMany(
                {},
                {
                    $pull: {
                        kinds: {
                            _id: kind._id,
                        },
                    },
                }
            );
            await Kind.findByIdAndDelete(id);
            return res.status(200).json({ msg: "Xóa thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new kindController();
