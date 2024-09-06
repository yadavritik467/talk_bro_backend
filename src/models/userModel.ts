import { config } from "dotenv";
import { DataTypes, Model, Sequelize } from "sequelize";
config({ path: "./.env" });
const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "mysql",
  logging: false,
});

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);
