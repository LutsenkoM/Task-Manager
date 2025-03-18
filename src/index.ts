import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.route';
import authRouter from './routes/auth.route';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const session = require('express-session');
const cors = require("cors");
const MongoDbStore = require('connect-mongodb-session')(session);
const store = new MongoDbStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});
const PORT = process.env.PORT || 4000;

connectDB();
app.use(session({secret: 'TooLongHashedSecretKey', resave: false, saveUninitialized: false, store}));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        exposedHeaders: ["Authorization"],
    })
);

app.use(express.json());

app.use((req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});