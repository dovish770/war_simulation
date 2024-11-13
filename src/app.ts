import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/MongoDb";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 7770;

// Middleware


app.use(express.json());
app.use(cors());

connectDb();


// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

