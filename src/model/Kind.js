const mongoose = require("mongoose");
const schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const kindSchema = new schema(
    {
        title: {
            type: String,
        },
        slug: { type: String, slug: "title" },
    },
    {
        timestamps: true,
    }
);

kindSchema.index({ title: "text" });
const kindModel = mongoose.model("Kinds", kindSchema);
kindModel.createIndexes({ title: "text" });

module.exports = kindModel;
