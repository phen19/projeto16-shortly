import express from 'express';
import cors from 'cors';
import userRouter from "./routes/userRoutes.js"
import urlRouter from "./routes/urlRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter)
app.use(urlRouter)

app.listen(4000, () => {
    console.log('Server listening on port 4000.');
});
  