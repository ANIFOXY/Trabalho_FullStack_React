const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login)
useRouter.get('/', authMiddleware(['admin', 'viewer']), UserApi.findUser);
useRouter.post('/', authMiddleware(['admin']), UserApi.createUser);
useRouter.put('/:id', authMiddleware(), UserApi.updateUser);
useRouter.delete('/:id', UserApi.deleteUser);

module.exports = useRouter;