import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDb from "./config/MongoDb";
import ConnectionRouter from "./routes/connection";
import defence from "./routes/defenceRouter";
import attack from "./routes/attackRouter";
import { setupWebSocket } from "./sockets/webSocket";
dotenv.config();


const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
setupWebSocket(server);

app.use('/war_simulation', ConnectionRouter, defence, attack)

connectDb();



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

