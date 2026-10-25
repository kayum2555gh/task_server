const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// register
const registerController = async (req, res) =>{
    try {
        const {username, email, password} = req.body;

        // validation
        if(!username || !email || !password){
            return res.status(500).send({
                success:false,
                message:"Pleas provide all the credential"
            })
        }

        // check email
        const existinguser =await userModel.findOne({email});
        if(existinguser){
            return res.status(500).send({
                success:false,
                message:'Alredy exist username'
            })
        }

        const salt =await bcrypt.genSalt(10);
        const hashPassward =await bcrypt.hash(password, salt);

        // save
        const newUser = await userModel({username, email, password:hashPassward});
        await newUser.save();

        res.status(200).send({
            success:true,
            message:"Succesfully register "
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Register api fail',
            error
        })
    }
}

// login
const loginController = async( req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        // validation
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user is not valid",
            })
        }
        
        const isMatch = bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid data"
            })
        }

        // token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"1d"});

        res.status(200).send({
            success:true,
            message:"login successfully",
            token,
            user:{
                id:user._id,
                username:user.username, 
            }
        })

        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Login api failed",
            error
        })
    }
}

module.exports = {registerController, loginController}