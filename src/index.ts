import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { Error, Sequelize } from "sequelize";
config({ path: "./.env" });

const app = express();
const port = 4500;

const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database is connected"))
  .catch((err: Error) => console.error("Database connection error:", err));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("server is working fine");
});

app.listen(port, () => {
  console.log("server working on ", port);
});
