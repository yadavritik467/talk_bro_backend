import { config } from "dotenv";
import { DataTypes, Model, Sequelize } from "sequelize";
config({ path: "./.env" });
const sequelize = new Sequelize(process.env.DB_URL as string);

export class Message extends Model {
    public id!: number;
    public senderId!: number;
    public groupId?: number;
    public content!: string;
    public mediaUrl?: string;
}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: {
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
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mediaUrl: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Message',
});
