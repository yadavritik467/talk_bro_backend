import express from "express";
import {
  getMyMessagesWithMyFriend,
  sendMessageToFriend,
} from "../controller/message.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/send-msg", isAuthenticated, sendMessageToFriend);
router.get(
  "/our-conversation/:friendId",
  isAuthenticated,
  getMyMessagesWithMyFriend
);

export default router;
