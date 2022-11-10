const mongoose = require("mongoose");
const schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const countrySchema = new schema(
    {
        name: {
            type: String,
        },
        slug: { type: String, slug: "name" },
    },
    {
        timestamps: true,
    }
);

countrySchema.index({ name: "text" });
const countryModel = mongoose.model("Countries", countrySchema);
countryModel.createIndexes({ name: "text" });

module.exports = countryModel;
