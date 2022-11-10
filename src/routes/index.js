const movie = require("./movie");
const kind = require("./kind");
const country = require("./country");
const user = require("./user");

function router(app) {
    app.use("/movie", movie);
    app.use("/kind", kind);
    app.use("/country", country);
    app.use("/user", user);
}

module.exports = router;
