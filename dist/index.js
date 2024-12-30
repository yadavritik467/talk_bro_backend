"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const sequelize_1 = require("sequelize");
const socket_io_1 = require("socket.io");
const message_js_1 = __importDefault(require("./routes/message.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
(0, dotenv_1.config)({ path: "./.env" });
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // You can restrict this to specific origins in production
    },
});
// Set up port from .env or default to 5000
const port = process.env.PORT || 5000;
// Set up Sequelize (MySQL) connection
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL, {
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
    .catch((err) => console.error("Database connection error:", err));
// Middleware
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)());
// Routes
app.use("/", user_js_1.default);
app.use("/", message_js_1.default);
// Socket.IO implementation
let onlineUserIds = [];
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Handle user joining a personal chat room
    socket.on("joinRoom", ({ userId }) => {
        socket.join(`user_${userId}`); // Each user gets their own room
        if (!onlineUserIds?.find((online) => online === userId)) {
            onlineUserIds?.push(userId);
        }
        io.emit("usersOnline", onlineUserIds);
    });
    // Handle new messages
    socket.on("sendMessage", (messageData) => {
        const { senderId, receiverId, content } = messageData;
        io.to(`user_${receiverId}`).emit("receiveMessage", {
            senderId,
            receiverId,
            content,
        });
    });
    // handle typing
    socket.on("startTyping", (typingInfo) => {
        io.emit("receiveTyping", { typingInfo });
    });
    socket.on("userDisconnect", ({ userId }) => {
        onlineUserIds = onlineUserIds?.filter((online) => online !== userId);
        io.emit("usersOffline", onlineUserIds);
    });
    // event for voice calling
    // Call initiation
    socket.on("callUser", ({ userToCall, from, signalData }) => {
        const myFriendId = `user_${userToCall}`;
        if (myFriendId) {
            io.to(myFriendId).emit("callIncoming", { from, signal: signalData });
        }
    });
    // Answer the call
    socket.on("answerCall", ({ to, signal }) => {
        const answerToFriend = `user_${to}`;
        if (answerToFriend) {
            io.to(answerToFriend).emit("callAnswered", signal);
        }
    });
    // ICE candidate exchange
    socket.on("sendCandidate", ({ to, candidate }) => {
        const userSocket = `user_${to}`;
        if (userSocket) {
            io.to(userSocket).emit("receiveCandidate", candidate);
        }
    });
    socket.on("cutCallToFriend", (data) => {
        console.log(data);
        const friendId = `user_${data?.friendId}`;
        const message = `${data?.frndName} has cut the call`;
        console.log(message);
        if (friendId) {
            io.to(friendId).emit("receiveCutCall", message);
        }
    });
    // Handle user disconnecting
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
// Assign Socket.IO instance globally
global.io = io; // This should no longer throw an error
// Root route
app.get("/", (req, res) => {
    res.send("Server is working!");
});
// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
