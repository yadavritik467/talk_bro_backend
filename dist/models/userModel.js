"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)({ path: "./.env" });
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL, {
    dialect: "mysql",
    logging: false,
});
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    name: {
        type: sequelize_1.DataTypes.STRING(512),
        unique: false,
        allowNull: false,
    },
    picture: {
        type: sequelize_1.DataTypes.STRING(512),
        unique: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(512),
        unique: true,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "User",
    tableName: "Users", // Make sure this matches the table name you want
    freezeTableName: true,
    timestamps: true,
});
