const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        rule: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", userSchema);
