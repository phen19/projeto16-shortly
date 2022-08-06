import express from 'express';
import cors from 'cors';
import userRouter from "./routes/userRoutes.js"
import urlRouter from "./routes/urlRoutes.js"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter)
app.use(urlRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is UP.');
});
  