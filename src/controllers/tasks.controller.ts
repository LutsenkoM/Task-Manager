import { Request, Response } from 'express';
import Task from '../models/task.model';

export const getTasks = async (req: any, res: Response) => {
    try {
        const tasks = await Task.find({ user: req.user!.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

export const createTask = async (req: any, res: Response) => {
    try {
        const { title, description, status } = req.body;
        const newTask = new Task({ title, description, status, user: req.user!.id });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

export const editTask = async (req: any, res: Response): Promise<any> => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.findById(req.params.id) as any;
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.user.toString() !== req.user!.id && req.user!.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to edit this task' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
};

export const deleteTask = async (req: any, res: Response): Promise<any> => {
    try {
        const task = await Task.findById(req.params.id) as any;
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (task.user.toString() !== req.user!.id && req.user!.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this task' });
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};