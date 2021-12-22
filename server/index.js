import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/users", userRouter);

const CONNECTION_URL = 'mongodb+srv://user_1:user_1@cluster0.r1a2g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT|| 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} and did not connect`));
