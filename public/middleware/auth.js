"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.headers["authorization"]?.slice(7);
        if (!token)
            return res.status(401).json({ message: "Invalid token" });
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token", error });
    }
};
exports.isAuthenticated = isAuthenticated;
