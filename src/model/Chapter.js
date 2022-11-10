const mongoose = require("mongoose");
const schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const chapterSchema = new schema(
    {
        movieLink: {
            type: String,
        },
        movie: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chapters", chapterSchema);
