import express from "express";

import { verifyToken } from '../Middlewares/verifyToken.js';

import { displayHome } from '../Controllers/displayHome.js';
import { signIn } from '../Controllers/signIn.js';
import { signUp } from '../Controllers/signUp.js';
import { getUsers, getUserById } from '../Controllers/getUsers.js';
import { createUser } from '../Controllers/createUser.js';
import { updateUser } from '../Controllers/updateUser.js';
import { deleteUser } from '../Controllers/deleteUser.js';

import { getCustomers } from '../Controllers/getCustomers.js';
import { getSales } from '../Controllers/getSales.js';
import { getCustomerByCode } from "../Controllers/getCustomers.js";
import { getReport } from '../Controllers/getReport.js';

const routes = express.Router();

routes.get('/', displayHome);

routes.get('/signIn', signIn);
routes.get('/signUp', signUp);

routes.get('/users', verifyToken, getUsers);
routes.get('/users/:id', verifyToken, getUserById);
routes.post('/users', verifyToken, createUser);
routes.put('/users/:id', verifyToken, updateUser);
routes.delete('/users/:id', verifyToken, deleteUser);

routes.get('/customers', getCustomers);
routes.get('/sales', getSales);
routes.get('/customers/:code', getCustomerByCode);
routes.get('/report', getReport);

export default routes;