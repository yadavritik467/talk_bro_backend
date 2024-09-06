import { config } from "dotenv";
import { Error, Sequelize } from "sequelize";
config({ path: "./.env" });

const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database is connected"))
  .catch((err: Error) => console.error("Database connection error:", err));

export default sequelize;
