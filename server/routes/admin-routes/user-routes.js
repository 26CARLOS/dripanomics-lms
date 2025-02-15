const express = require('express');
const { getAllUsers, searchUsers, deleteUser, promoteUser } = require('../../controllers/admin-controller/user-controller');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/search', searchUsers);
router.delete('/delete/:userId', deleteUser);
router.patch('/promote/:userId', promoteUser);

module.exports = router;