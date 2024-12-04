import { Request, Response } from "express";
import { Message } from "../models/messageModel";
import { Op } from "sequelize";

export const sendMessageToFriend = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?.id;
    const receiverId = req.body?.receiverId;
    const content = req.body?.message;

    await Message.create({
      senderId,
      receiverId,
      content,
    });
    return res.status(200).json({ message: "msg sent" });
  } catch (error: any) {
    console.log("error", error?.message);
  }
};

export const getMyMessagesWithMyFriend = async (
  req: Request,
  res: Response
) => {
  try {
    const requesterId = req.user?.id;
    const receiverId = req.params?.friendId;
    let ourConversation = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: requesterId, receiverId: receiverId },
          { senderId: receiverId, receiverId: requesterId },
        ],
      },
    });
    ourConversation = ourConversation?.sort((a, b) => a?.id - b?.id);
    return res.status(200).json({ ourConversation });
  } catch (error: any) {
    console.log("error", error?.message);
  }
};
