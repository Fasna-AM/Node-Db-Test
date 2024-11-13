const  bcrypt = require('bcryptjs')
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')


// register
exports.registerController = async(req,res)=>{
    console.log(("Inside registerController"));
    
    // res.status(200).json("register request received")


    console.log(req.body);
    const {userId,firstName,lastName,email,password,phone} =req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existing user .....")
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)     // const hashedPassword = await bcrypt.hash(password,10) 
            const newUser = new users({
                userId,firstName,lastName,email,password:hashedPassword,phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status(401).json(err)
    }


    
    
}



// login
exports.loginController = async(req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            // console.log(existingUser);
            const decyptPassword = await bcrypt.compare(password, existingUser.password)
            if(decyptPassword){
                //token generation
                const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
                res.status(200).json({user:existingUser,token})

            }else{
                res.status(404).json("Incorrect password!!!")

            }

        }else{
            res.status(404).json("Incorrect email!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }


    
    
}


// view all users
exports.allUserController = async(req,res)=>{
    console.log("inside allUserController");
    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers.map(user=>({firstName:user.firstName,lastName:user.lastName,email:user.email,phone:user.phone})))

    }catch(err){
        res.status(401).json(err)
    }
    
}

//View one user
exports.oneUserController = async(req,res)=>{
    console.log("inside oneUserController");
    const{email} =req.body

    try{
        const user = await users.findOne({email})
        
        res.status(200).json({
            userId:user.userId,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phone:user.phone

        })
    }catch(err){
        res.status(401).json(err)
    }
    
}