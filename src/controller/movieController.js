const Movie = require("../model/Movie");

class apiRequest {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 8;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    sorting() {
        const sort = this.queryString.sort || "-createdAt";
        this.query = this.query.sort(sort);
        return this;
    }
    searching() {
        const search = this.queryString.search;
        if (search) {
            this.query = this.query.find({
                $text: {
                    $search: search,
                },
            });
        } else {
            this.query = this.query.find();
        }
        return this;
    }

    filter() {
        const obj = { ...this.queryString };
        const excludes = ["page", "sort", "limit", "search"];

        excludes.forEach((el) => delete obj[el]);
        var objStr = JSON.stringify(obj);

        objStr = objStr.replace(
            /\b(gte|gt|lte|lt|regex)\b/g,
            (match) => "$" + match
        );
        this.query = this.query.find(JSON.parse(objStr));
        return this;
    }
}

class movieController {
    async getMovie(req, res) {
        try {
            const api = new apiRequest(
                Movie.find()
                    .populate({
                        path: "kinds",
                        select: "title slug",
                    })
                    .populate("chapters"),
                req.query
            )
                .filter()
                .paginating()
                .searching()
                .sorting();
            const movies = await api.query;
            const count = await Movie.count(api.query.limit(null).skip(null));
            res.status(200).json({ movies, count });
        } catch (ex) {
            return res.status(500).json({ msg: ex.message });
        }
    }

    async getOneMovie(req, res) {
        try {
            const { slug } = req.params;
            const movie = await Movie.findOne({ slug })
                .populate({
                    path: "kinds",
                    select: "title slug",
                })
                .populate("chapters");
            res.status(200).json({ movie });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    }

    async createMovie(req, res) {
        try {
            const {
                title,
                engTitle,
                status,
                image,
                trailer,
                times,
                year,
                kinds,
                description,
                country,
                languageF,
                moviesLink,
                isSeries,
            } = req.body;
            const movie = new Movie({
                title,
                engTitle,
                status,
                image,
                trailer,
                times,
                year,
                kinds,
                description,
                country,
                languageF,
                moviesLink,
                isSeries,
            });

            await movie.save();
            res.status(200).json({ msg: "Tạo thành công phim.", movie });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    async deleteMovie(req, res) {
        try {
            const { id } = req.params;
            const movie = await Movie.findById(id);
            if (!movie) {
                return res.status(400).json({ msg: "Phim này không tồn tại." });
            }
            await Movie.findByIdAndDelete(id);
            return res.status(200).json({ msg: "Xóa thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async updateMovie(req, res) {
        try {
            const { id } = req.params;
            const {
                title,
                engTitle,
                status,
                image,
                trailer,
                times,
                year,
                kinds,
                description,
                country,
                languageF,
                moviesLink,
                isSeries,
            } = req.body;
            const movie = await Movie.findById(id);
            if (!movie) {
                return res.status(400).json({ msg: "Phim này không tồn tại." });
            }
            await Movie.findByIdAndUpdate(id, {
                title,
                engTitle,
                status,
                image,
                trailer,
                times,
                year,
                kinds,
                description,
                country,
                languageF,
                moviesLink,
                isSeries,
            });
            return res.status(200).json({ msg: "Cập nhật thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new movieController();
