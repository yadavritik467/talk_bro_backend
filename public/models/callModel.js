"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)({ path: "./.env" });
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL);
class Call extends sequelize_1.Model {
}
exports.Call = Call;
Call.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    callerId: {
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
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Call",
});
