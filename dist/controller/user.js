"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.myProfile = exports.authGoogleCallback = exports.authGoogle = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const querystring_1 = __importDefault(require("querystring"));
const userModel_js_1 = require("../models/userModel.js");
// google authentication
const authGoogle = async (req, res) => {
    try {
        const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.BACKEND_URL}/google/callback&scope=profile%20email`;
        return res.redirect(redirectUri);
    }
    catch (error) {
        console.log("1", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.authGoogle = authGoogle;
const authGoogleCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (typeof code !== "string") {
            return res.status(400).json({ error: "Invalid authorization code" });
        }
        const tokenResponse = await axios_1.default.post("https://oauth2.googleapis.com/token", querystring_1.default.stringify({
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: `${process.env.BACKEND_URL}/google/callback`,
            grant_type: "authorization_code",
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const { access_token } = tokenResponse?.data;
        const userResponse = await axios_1.default.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const user = await userResponse?.data;
        const isExistUser = await userModel_js_1.User.findOne({ where: { email: user?.email } });
        if (isExistUser) {
            const token = jsonwebtoken_1.default.sign({ id: isExistUser?.id }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            if (isExistUser?.picture !== user?.picture) {
                isExistUser.picture = user?.picture;
                await isExistUser.save();
            }
            return res.redirect(`${process.env.FRONT_URL}/?token=${token}`);
        }
        else {
            const newUser = await userModel_js_1.User.create({
                name: user?.name,
                picture: user?.picture,
                email: user?.email,
            });
            const token = jsonwebtoken_1.default.sign({ id: newUser?.id }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            return res.redirect(`${process.env.FRONT_URL}/?token=${token}`);
        }
    }
    catch (error) {
        console.log("2", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.authGoogleCallback = authGoogleCallback;
const myProfile = async (req, res) => {
    try {
        const user = await userModel_js_1.User.findByPk(req.user?.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.myProfile = myProfile;
const allUsers = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const allUser = await userModel_js_1.User.findAll({
        // where: {
        //   id: {
        //     [Op.ne]: userId,
        //   },
        // },
        });
        if (!allUser?.length) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ allUser });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.allUsers = allUsers;
