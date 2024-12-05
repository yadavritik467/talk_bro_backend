"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroup = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)({ path: "./.env" });
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL);
class UserGroup extends sequelize_1.Model {
}
exports.UserGroup = UserGroup;
UserGroup.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
    groupId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Groups',
            key: 'id',
        },
        allowNull: false,
    },
    joinedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'UserGroup',
});
