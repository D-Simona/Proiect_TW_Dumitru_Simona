const { User } = require("../database/models");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password} = req.body;

        const existingUser = await User.findOne({ 
            where: { 
                email: email 
            } 
        });

        if (existingUser) {
            return res.status(400).json({success:false,message:'User already exists.', data:{}});
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        delete user.dataValues.password;

        res.status(201).json({success:true,message:'User created successfully.', data:user});

    } catch (error) {
        res.status(500).json({success:false,message:'Error creating a user.', data:{}});        
    }

})

module.exports = router;