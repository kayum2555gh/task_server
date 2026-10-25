const todoModel = require("../models/todoModel");

const createTodo = async (req, res) => {
    try {

        const { title, description, createdBy } = req.body;
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "please provide the title and description"
            })
        }

        const todo = todoModel({ title, description, createdBy });
        const result = await todo.save();
        console.log(result);
        res.status(201).send({
            success: true,
            message: "your task has been created",
            result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in create todo api",
            error
        })
    }
}


// get all todos
const getAllTodo = async (req, res) => {
    try {
        const { userId } = req.params;
        // validate
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }

        // find task
        const todos = await todoModel.find({ createdBy: userId });
        if (!todos) {
            return res.status(404).send({
                success: false,
                message: "no todo available",
            })
        }
        res.status(200).send({
            success:true,
            message : "your todos ",
            todos
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in the get todo",
            error
        })

    }
}


// delete api
const deleteTodo =async (req, res) => {
    try {

        const {id} = req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"no id found as per given id"
            })
        }
        
        // find by id
        const todo = await todoModel.findByIdAndDelete({_id:id});
        
        if(!todo){
            return res.status(404).send({
                success:false,
                message:"No task found"
            })
        }
        res.status(200).send({
            success:true,
            message:"your task has been delete"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"error in the delete api",
            error
        })
    }
}

// update todo
const  updateTodo =async (req,res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"please provide id"
            })
        }
        const data = req.body;
        const todo = await todoModel.findByIdAndUpdate(id, {$set:data},
        {returnOrignal:false}
        );

        res.status(200).send({
            success:true,
            message:"update data "
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in the update data"
        })
    }
}


module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo }