import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Завантаження змінних середовища з файлу .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware для парсингу JSON
app.use(express.json());

// Простий маршрут для перевірки роботи сервера
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});