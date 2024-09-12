import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import { Sequelize, Error } from "sequelize";
import { Server } from "socket.io";
import userRoutes from "./routes/user.js";
config({ path: "./.env" });

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // You can restrict this to specific origins in production
  },
});

// Set up port from .env or default to 5000
const port = process.env.PORT || 5000;

// Set up Sequelize (MySQL) connection
const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Sync database
sequelize
  .sync({ force: false })
  .then(() => console.log("Database is connected"))
  .catch((err: Error) => console.error("Database connection error:", err));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Routes
app.use("/", userRoutes);

// Socket.IO implementation
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining a personal chat room
  socket.on("joinRoom", ({ userId }) => {
    socket.join(`user_${userId}`); // Each user gets their own room
    console.log(`User ${userId} joined room user_${userId}`);
  });

  // Handle new messages
  socket.on("sendMessage", (messageData) => {
    const { senderId, receiverId, content } = messageData;
    io.to(`user_${receiverId}`).emit("receiveMessage", {
      senderId,
      content,
    });
    console.log(
      `Message from user_${senderId} to user_${receiverId}: ${content}`
    );
  });
  // handle typing
  socket.on("startTyping", (typingInfo) => {
    io.emit("receiveTyping", { typingInfo });
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Assign Socket.IO instance globally
global.io = io; // This should no longer throw an error

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is working!");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
