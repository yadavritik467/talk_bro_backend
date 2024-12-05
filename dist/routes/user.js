"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_js_1 = require("../controller/user.js");
const auth_js_1 = require("../middleware/auth.js");
const router = express_1.default.Router();
router.get("/auth/google", user_js_1.authGoogle);
router.get("/google/callback", user_js_1.authGoogleCallback);
router.get("/my-profile", auth_js_1.isAuthenticated, user_js_1.myProfile);
router.get("/all-users", auth_js_1.isAuthenticated, user_js_1.allUsers);
exports.default = router;
