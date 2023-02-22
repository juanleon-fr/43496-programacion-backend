import express, { Router } from 'express';
import passport from 'passport';
const routeUsers = Router();
import { getUserInfo, deleteUser, postSignup, getSignout, postSignin } from '../controllers/users.js';

const app = express();

app.use('/user', routeUsers);

routeUsers.post('/signup', postSignup);

routeUsers.post('/signin', postSignin);

routeUsers.get('/signout', getSignout);

routeUsers.get('/profile', getUserInfo);

routeUsers.delete('/profile', deleteUser);

// routeUsers.delete('/admin/profile', deleteUser);

// routeUsers.get('/admin/:id', getUserInfo);

export default routeUsers;
