import { Server as SocketIOServer } from "socket.io";

// Extend the NodeJS Global interface to include `io`
declare global {
  namespace NodeJS {
    interface Global {
      io: SocketIOServer;
    }
  }

  var io: SocketIOServer; // This is to avoid TypeScript errors when accessing global.io
}
