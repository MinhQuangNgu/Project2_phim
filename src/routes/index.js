const movie = require("./movie");
const kind = require("./kind");
const country = require("./country");
const user = require("./user");
const chapter = require("./chapter");

function router(app) {
    app.use("/movie", movie);
    app.use("/kind", kind);
    app.use("/country", country);
    app.use("/user", user);
    app.use("/chapter", chapter);
}

module.exports = router;
