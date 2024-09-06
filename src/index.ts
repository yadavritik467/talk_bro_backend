import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 4500;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("server is working on the web page");
});

app.listen(port, () => {
  console.log("server working on ", port);
});
