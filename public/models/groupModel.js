"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)({ path: "./.env" });
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL);
class Group extends sequelize_1.Model {
}
exports.Group = Group;
Group.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    adminId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Group',
});
