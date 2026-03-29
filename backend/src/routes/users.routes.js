const { Router } = require('express');
const { createUser, updateUser } = require('../controllers/user.controller');
const authenticate = require('../middleware/authenticate');

const router = Router();

router.use(authenticate);

router.post('/', createUser);
router.put('/:id', updateUser);

module.exports = router;
