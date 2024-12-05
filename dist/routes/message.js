"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_js_1 = require("../controller/message.js");
const auth_js_1 = require("../middleware/auth.js");
const router = express_1.default.Router();
router.post("/send-msg", auth_js_1.isAuthenticated, message_js_1.sendMessageToFriend);
router.get("/our-conversation/:friendId", auth_js_1.isAuthenticated, message_js_1.getMyMessagesWithMyFriend);
exports.default = router;
