import { DataTypes, Model, Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.DB_URL as string);

export class Call extends Model {
    public id!: number;
    public callerId!: number;
    public receiverId!: number;
    public type!: string; // e.g., 'audio' or 'video'
    public status!: string; // e.g., 'initiated', 'accepted', 'rejected'
}

Call.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    callerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Call',
});
