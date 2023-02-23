import express, { Router } from 'express';
const routeUsers = Router();
import { getUserInfo, deleteUser, postSignup, getSignout, postSignin } from '../controllers/users.js';
import { passportSignin, checkAuthentication, checkNoSession } from '../middleware/passportAuth.js';
import passport from 'passport';
const lala = () => {
	console.log('hola lala');
	passport.authenticate('local', { failureRedirect: '/signin' });
};

const app = express();

app.use('/user', routeUsers);

routeUsers.post('/signup', checkNoSession, postSignup, lala, postSignin);

routeUsers.post('/signin', checkNoSession, lala, postSignin);

routeUsers.get('/signout', checkAuthentication, getSignout);

routeUsers.get('/profile', checkAuthentication, getUserInfo);

routeUsers.delete('/profile', checkAuthentication, deleteUser);

// routeUsers.delete('/admin/profile', checkAuthentication, checkAdminRole, deleteUser);

// routeUsers.get('/admin/:id', checkAuthentication, checkAdminRole, getUserInfo);

export default routeUsers;
