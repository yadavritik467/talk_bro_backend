import { config } from "dotenv";
import { DataTypes, Model, Sequelize } from "sequelize";
config({ path: "./.env" });
const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "mysql",
  logging: true,
});

export class User extends Model {
  public id!: number;
  public name!: string;
  public picture!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: 1,
    },
    name: {
      type: DataTypes.STRING(512),
      unique: false,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING(512),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(512),
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users", // Make sure this matches the table name you want
    freezeTableName: true,
    timestamps: true,
  }
);
