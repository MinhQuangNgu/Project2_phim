const mongoose = require("mongoose");
const schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const movieSchema = new schema(
    {
        title: {
            type: String,
        },
        engTitle: {
            type: String,
        },
        status: {
            type: String,
        },
        image: {
            type: String,
        },
        trailer: {
            type: String,
        },
        times: {
            type: String,
        },
        reviewer: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        year: {
            type: Number,
        },
        kinds: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Kinds",
                },
            ],
            default: [],
        },
        description: {
            type: String,
        },
        country: {
            type: mongoose.Types.ObjectId,
            ref: "Countries",
        },
        languageF: {
            type: String,
        },
        moviesLink: {
            type: String,
        },
        slug: {
            type: String,
            slug: "title",
        },
        type: {
            type: String,
        },
        chapters: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Chapters",
                },
            ],
            default: [],
        },
        watching: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

movieSchema.index({ title: "text", engTitle: "text" });
const movieModel = mongoose.model("Movies", movieSchema);
movieModel.createIndexes({ title: "text", engTitle: "text" });

module.exports = movieModel;
