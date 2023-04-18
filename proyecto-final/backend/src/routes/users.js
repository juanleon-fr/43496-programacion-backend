import express, { Router } from 'express';
const routeUsers = Router();
import { deleteUser, postSignup, signout, postSignin, getUserBySession, getUserInfo } from '../controllers/users.js';
import { passportSignin, checkAuthentication, checkNoSession } from '../middleware/passportAuth.js';
import checkAdminRole from '../middleware/adminPrivileges.js';

const app = express();

app.use('/user', routeUsers);

routeUsers.post('/signup', checkNoSession, postSignup, passportSignin, postSignin);

routeUsers.post('/signin', checkNoSession, passportSignin, postSignin);

routeUsers.delete('/signout', checkAuthentication, signout);

routeUsers.get('/profile', checkAuthentication, getUserBySession);

routeUsers.delete('/profile', checkAuthentication, deleteUser);

routeUsers.delete('/admin/profile', checkAuthentication, checkAdminRole, deleteUser);

routeUsers.get('/admin/:id', checkAuthentication, checkAdminRole, getUserInfo);

export default routeUsers;
