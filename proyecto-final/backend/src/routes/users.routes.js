import express, { Router } from 'express';
const routeUsers = Router();
import { getUserInfo, deleteUser, postSignup, getSignout, postSignin, getUserBySession } from '../controllers/users.js';
import { passportSignin, checkAuthentication, checkNoSession } from '../middleware/passportAuth.js';

const app = express();

app.use('/user', routeUsers);

routeUsers.post('/signup', checkNoSession, postSignup, passportSignin, postSignin);

routeUsers.post('/signin', checkNoSession, passportSignin, postSignin);

routeUsers.get('/signout', checkAuthentication, getSignout);

routeUsers.get('/profile', checkAuthentication, getUserBySession);

routeUsers.delete('/profile', checkAuthentication, deleteUser);

// routeUsers.delete('/admin/profile', checkAuthentication, checkAdminRole, deleteUser);

// routeUsers.get('/admin/:id', checkAuthentication, checkAdminRole, getUserInfo);

export default routeUsers;
