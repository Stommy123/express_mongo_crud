import { Router as ExpressRouter } from 'express';
import Middleware from '../middleware';
import TaskController from './task.controllers';

const Router = ExpressRouter();

Router.get('/', Middleware.withAuth, TaskController.listTasks);

Router.post('/', Middleware.withAuth, TaskController.createTask);

export default Router;
