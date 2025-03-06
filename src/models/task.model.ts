import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    status: 'new' | 'in progress' | 'done';
    createdAt: Date;
    dueDate?: Date;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['new', 'in progress', 'done'], default: 'new' },
    createdAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user who created the task
});

export default mongoose.model<ITask>('Task', TaskSchema);
