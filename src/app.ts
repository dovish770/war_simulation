import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/MongoDb";
import ConnectionRouter from "./routes/connection";
import missiles from "./routes/missiles";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 7770;

// Middleware


app.use(express.json());
app.use(cors());

app.use('/war_simulation', ConnectionRouter, missiles)

connectDb();


// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

