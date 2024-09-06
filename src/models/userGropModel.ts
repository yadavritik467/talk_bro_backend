import { config } from "dotenv";
import { DataTypes, Model, Sequelize } from "sequelize";
config({ path: "./.env" });
const sequelize = new Sequelize(process.env.DB_URL as string);

export class UserGroup extends Model {
    public userId!: number;
    public groupId!: number;
    public joinedAt!: Date;
}

UserGroup.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Groups',
            key: 'id',
        },
        allowNull: false,
    },
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'UserGroup',
});
