import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//get All Users
export const getAllUser = async(req,res)=>{
    console.log('getAllll userrrrrrr');
    try {
        let users =await UserModel.find()

        users = users.map((user)=>{
            const {password,...otherDetails} =user._doc
            return otherDetails
        })
        console.log(users,'usersasasa');
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


//get user
export const getUser = async(req,res)=>{
    const id = req.params.id
    try {
        const user = await UserModel.findById(id)

        if(user){

            const {password,...otherDetails} = user._doc

            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("no such user exist")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//update a user
export const updateUser = async (req, res)=>{
    const id = req.params.id
    const {_id, currentUserAdminStatus, password} = req.body
     console.log('calleddddddddd');
    if(id === _id){
        console.log('checked idddddd');
        try {
            console.log('try getttttt');
            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)

            }
            console.log("before update",id);
            console.log(req.body);
            const user = await UserModel.findByIdAndUpdate(id, req.body ,{new:true})
            console.log('updatedddddddd');
            const token = jwt.sign(
        {username:user.username , id: user._id},
        process.env.JWT_KEY, {expiresIn: '1hr'})
            console.log(user,'userDetailsssssss');
            console.log(token);
            res.status(200).json({user, token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access denied ! only you can update your own profile")
    }
}

//Delete a user
export const deleteUser = async (req, res)=>{
    const id = req.params.id
     
    const {currentUserId, currentUserAdminStatus} = req.body

    if(currentUserId === id || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("user deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access denied ! only you can delete your own profile")
    }
}

//follow a user
export const followUser = async(req, res)=>{
    const id = req.params.id

    const {_id} = req.body

    if(_id === id){
        res.status(403).json("action forbidden")
    }
    else{
        try {
            const followUser= await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push : {followers : _id}})
                await followingUser.updateOne({$push : {following : id}})
                res.status(200).json("user followed!")
            }
            else{
                res.status(403).json("User is already followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//unFollow a user
export const unFollowUser = async(req, res)=>{
    const id = req.params.id

    const {_id} = req.body

    if(_id === id){
        res.status(403).json("action forbidden")
    }
    else{
        try {
            const followUser= await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull : {followers : _id}})
                await followingUser.updateOne({$pull : {following : id}})
                res.status(200).json("user unFollowed!")
            }
            else{
                res.status(403).json("User is not followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}