import { Server, Socket } from "socket.io";

let io: Server | null = null;


export const setupWebSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join_room", (region: string) => {
      socket.join(region);
      console.log(`Client ${socket.id} joined region ${region}`);
      socket.to(region).emit("notification", `A new soldier has joined ${region}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  console.log("socket initialized");
};


export const getSocketInstance = (): Server => {
  if (!io) {
    throw new Error("error initializing socket");
  }
  return io;
};