const express = require('express');
const handler = require('./handler');

const router = express.Router();

router.post('/register', handler.register);
router.post('/login', handler.login);
router.get('/readUser', handler.readUser);
router.put('/updateUser', handler.updateUser);
router.delete('/deleteUser', handler.deleteUser);

module.exports = router;
