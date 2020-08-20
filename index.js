import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRoutes from './user/user.routes';
import TaskRoutes from './task/task.routes';

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

const app = express();

// allow you to access a json `request.body` in your route handlers
app.use(express.json());

app.use('/users', UserRoutes);
app.use('/tasks', TaskRoutes);

app.listen(4000, () => console.log('App is listening!'));
