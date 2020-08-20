import { Router as ExpressRouter } from 'express';
import UserController from './user.controllers';
import Middleware from '../middleware';

const Router = ExpressRouter();

// list users
Router.get('/', UserController.listUsers);

// find user by id
Router.get('/find/:id', UserController.findUserById);

// create user
Router.post('/', UserController.createUser);

// login
Router.post('/login', UserController.login);

// update user
Router.patch('/:id', UserController.updateUser);

export default Router;
