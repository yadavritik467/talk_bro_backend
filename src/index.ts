import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import userRoutes from "./routes/user.js";
import { Error, Sequelize } from "sequelize";
config({ path: "./.env" });

const app = express();
const port = process.env.PORT;

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

app.use("/", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("server is working on the web page");
});

app.listen(port, () => {
  console.log("server working on ", port);
});
