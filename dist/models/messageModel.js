"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)({ path: "./.env" });
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL);
class Message extends sequelize_1.Model {
}
exports.Message = Message;
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id",
        },
        allowNull: false,
    },
    receiverId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id",
        },
        allowNull: false,
    },
    groupId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Groups",
            key: "id",
        },
        allowNull: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    mediaUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: "Message",
    freezeTableName: true,
    timestamps: true,
});
