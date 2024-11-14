import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/MongoDb";
import ConnectionRouter from "./routes/connection";
import defence from "./routes/defenceRouter";
import attack from "./routes/attackRouter";
import http from "http";
import { setupSocket } from "./sockets/webSocket";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 7770;

app.use(express.json());
app.use(cors());

app.use('/war_simulation', ConnectionRouter, defence, attack);

connectDb();

setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
