import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from "./routes/userRouter.js";
import roomRouter from "./routes/roomRouter.js";
import { setupSocket } from './socket/index.js';
import { setupDatabase } from './database/setup.js';
import { dbConnection } from './database/connect.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/users', userRouter);
app.use('/sharing', roomRouter);

const CONNECTION_URL = 'mongodb+srv://user_1:user_1@cluster0.r1a2g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

const connection = await dbConnection()
await setupDatabase(connection);
await setupSocket(app);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

