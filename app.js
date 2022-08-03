import express from 'express';
import cors from 'cors';
import userRouter from "./routes/userRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter)

app.listen(4000, () => {
    console.log('Server listening on port 4000.');
});
  