"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyMessagesWithMyFriend = exports.sendMessageToFriend = void 0;
const messageModel_1 = require("../models/messageModel");
const sequelize_1 = require("sequelize");
const sendMessageToFriend = async (req, res) => {
    try {
        const senderId = req.user?.id;
        const receiverId = req.body?.receiverId;
        const content = req.body?.message;
        await messageModel_1.Message.create({
            senderId,
            receiverId,
            content,
        });
        return res.status(200).json({ message: "msg sent" });
    }
    catch (error) {
        console.log("error", error?.message);
    }
};
exports.sendMessageToFriend = sendMessageToFriend;
const getMyMessagesWithMyFriend = async (req, res) => {
    try {
        const requesterId = req.user?.id;
        const receiverId = req.params?.friendId;
        let ourConversation = await messageModel_1.Message.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { senderId: requesterId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: requesterId },
                ],
            },
        });
        ourConversation = ourConversation?.sort((a, b) => a?.id - b?.id);
        return res.status(200).json({ ourConversation });
    }
    catch (error) {
        console.log("error", error?.message);
    }
};
exports.getMyMessagesWithMyFriend = getMyMessagesWithMyFriend;
