import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.route';
import authRouter from './routes/auth.route';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(session({secret: 'TooLongHashedSecretKey', resave: false, saveUninitialized: false}));
app.use((req: any, res: any, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'application/json');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
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