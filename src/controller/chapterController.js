const Chapter = require("../model/Chapter");
const Movie = require("../model/Movie");
class chapterController {
    async createChapter(req, res) {
        try {
            const { movieId } = req.params;
            const { movieLink } = req.body;
            const movie = await Movie.findOne({ slug: movieId });
            if (!movie) {
                return res.status(400).json({ msg: "Phim này không tồn tại." });
            }
            const chapter = new Chapter({
                movieLink,
                movie: movie.slug,
            });
            await chapter.save();
            movie.chapters.push(chapter._id);
            await Movie.findByIdAndUpdate(movie._id, {
                ...movie,
            });
            res.status(200).json({ msg: "Tạo thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    async deleteChapter(req, res) {
        try {
            const { id } = req.params;
            const chapter = await Chapter.findById(id);
            if (!chapter) {
                return res
                    .status(400)
                    .json({ msg: "Tập này không hề tồn tại." });
            }
            const movie = await Movie.findOne({ slug: chapter.movie });
            if (!movie) {
                return res.status(400).json({ msg: "Phim này không tồn tại." });
            }
            movie.chapters = movie.chapters.map((item) => {
                if (item !== chapter._id) {
                    return item;
                }
            });
            await Chapter.findByIdAndDelete(id);
            await Movie.findByIdAndUpdate(movie._id, {
                ...movie,
            });
            res.status(200).json({ msg: "Xóa thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    async updateChapter(req, res) {
        try {
            const { id } = req.params;
            const { movieLink } = req.body;

            const chapter = await Chapter.findById(id);
            if (!chapter) {
                return res
                    .status(400)
                    .json({ msg: "Tập này không hề tồn tại." });
            }
            await Chapter.findByIdAndUpdate(id, {
                movieLink,
            });
            res.status(200).json({ msg: "Cập nhật thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new chapterController();
