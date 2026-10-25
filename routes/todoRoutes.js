const express = require('express');
const { createTodo, getAllTodo, deleteTodo, updateTodo } = require('../controllers/todoController');
const authMiddleware = require('../middlerwares/authMiddleware');
const router = express.Router();


router.post('/create', authMiddleware,createTodo );
router.post('/getAll/:userId', authMiddleware,getAllTodo );
router.delete('/delete/:id', authMiddleware, deleteTodo );
router.patch('/update/:id',authMiddleware, updateTodo)


module.exports = router;