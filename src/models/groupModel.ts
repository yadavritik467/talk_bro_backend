import { config } from "dotenv";
import { DataTypes, Model, Sequelize } from "sequelize";
config({ path: "./.env" });
const sequelize = new Sequelize(process.env.DB_URL as string);

export class Group extends Model {
    public id!: number;
    public name!: string;
    public adminId!: number; // ID of the user who created the group
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adminId: {
        type: DataTypes.INTEGER,
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
