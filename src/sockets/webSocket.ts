import { Server, Socket } from "socket.io";

export const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (region: string) => {
      if (io.sockets.adapter.rooms.has(region)) {
        console.log(`Room ${region} exists, joining...`);
      } else {
        console.log(`Room ${region} does not exist, creating...`);
      }

      socket.join(region);
      console.log(`User joined room: ${region}`);

      socket.emit("roomStatus", `You joined room: ${region}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
