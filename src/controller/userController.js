const User = require("../model/User");

const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

class userController {
    async login(req, res) {
        try {
            const { token, userId } = req.body;
            const product = await fetch(
                `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
            );
            const data = await product.json();

            const user = await User.findOne({ email: data.email });
            if (!user) {
                return res.status(400).json({ msg: "Xin lỗi." });
            }
            const accessToken = getAccessToken(user);
            return res
                .status(200)
                .json({ accessToken, msg: "Đăng Nhập Thành Công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    async register(req, res) {
        try {
            const { token, userId } = req.body;
            const product = await fetch(
                `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
            );
            const data = await product.json();
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Xin lỗi." });
            }
            const newUser = new User({
                email: data.email,
                password: userId,
            });

            await newUser.save();
            return res.status(200).json({ msg: "Đăng Ký Thành Công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

function getAccessToken(user) {
    return jwt.sign({ id: user._id }, process.env.ACCESSTOKEN, {
        expiresIn: "3d",
    });
}

module.exports = new userController();
