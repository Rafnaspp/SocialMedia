import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodeMailer from 'nodemailer'
import twilio from 'twilio'

//check user exist 
export const checkUser = async(req, res)=>{
    
    
   
    const {mobile} = req.body
    const {...data} = req.body
    console.log(data);
    let check = false
    const newUser = new UserModel(req.body)
    const {username} = req.body
    const oldUser = await UserModel.findOne({username})
    
    if(oldUser){
        return res.status(200).json({message: "user name is already regisrtered"})
    } 
    // else{
    //     const serviveSSID =process.env.serviveSSID
    //     const accountSID =  process.env.accountSID
    //     const authToken = process.env.authToken
    //     const client =twilio(accountSID,authToken);
    //     client.verify.services(serviveSSID).verifications.create({
    //         to :`+91${mobile}`,
    //         channel:"sms"
    //     })
    // }
    check = true
    res.status(200).json(true)
}


//Registering a new user
export const registerUser = async(req, res)=>{

    try {    
    console.log(req.body);
    console.log('reqssssssssssbodyyyyyyyyy');
    const mobile = req.body.mobile
    const otp=req.body.OTP
    // console.log(otp,"otppppp");
    // const serviveSSID =process.env.serviveSSID
    // const accountSID = process.env.accountSID
    // const authToken =  process.env.authToken 
    // const client =twilio(accountSID,authToken);
    // const isOtp = await client.verify.services(serviveSSID).verificationChecks.create({
    //     to:   `+91${mobile}`,
    //     code:otp
    // }).then((resp) => {
    //     console.log('otp res ',resp);
    //     return resp
    // }).catch(error=>{
    //     console.log(error);
    // })
    // console.log("is otp......",isOtp.valid);
   
    if(otp==='12345'){
      var isOtp ={
           valid: true
        }
    }
    if(isOtp.valid){
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const newUser = new UserModel(req.body)
    const user = await newUser.save()
    const token = jwt.sign({
        username:user.username , id: user._id
    },process.env.JWT_KEY, {expiresIn: '1hr'})

        res.status(200).json({user, token})
    }else{
        res.status(200).json({user:null})
    }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Log in a user

export const loginUser = async (req, res)=>{
    const {username, password} = req.body

    try {
        
        const user = await UserModel.findOne({username:username})
        console.log('user on login',user);
        if(!user.block){
            const validity = await bcrypt.compare(password , user.password)
          
            if(!validity){
                res.status(400).json("wrong password")
            }
            else{
                const token = jwt.sign({
                    username:user.username , id: user._id
                },process.env.JWT_KEY, {expiresIn: '1hr'})
                res.status(200).json({user, token})
            }
        }
        else{
            res.status(404).json('user does not found')
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//userUnblock

export const userUnblock = async(req,res)=>{
    try {
        console.log(req.body);
    const id = req.body.userId
    console.log(id);
    const blockUser= await UserModel.findById(id)
    await blockUser.updateOne({$set:{"block":false}})
    console.log('unblockkk');
    res.status(200).json(blockUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//userBlodck

export const userBlock = async (req, res )=>{
    try {
        console.log(req.body);
    const id = req.body.userId
    console.log(id);
    const blockUser= await UserModel.findById(id)
    await blockUser.updateOne({$set:{"block":true}})
    console.log('blockkkkkkkkkk');
    res.status(200).json(blockUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

    }
   
