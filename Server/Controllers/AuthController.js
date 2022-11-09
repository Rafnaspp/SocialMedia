import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
    else{
        const serviveSSID ='VAc8116e25058aa76073b7cdd888281806'
        const accountSID = 'AC540070733f87f5dbf7c18f5aa3e91df5'
        const authToken = 'f1b4b9c95200fc18fc49e79dd23cd6c5'
        const client =twilio(accountSID,authToken);
        client.verify.services(serviveSSID).verifications.create({
            to :`+91${mobile}`,
            channel:"sms"
        })
    }
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
    console.log(otp,"otppppp");
    const serviveSSID ='VAc8116e25058aa76073b7cdd888281806'
    const accountSID = 'AC540070733f87f5dbf7c18f5aa3e91df5'
    const authToken = 'f1b4b9c95200fc18fc49e79dd23cd6c5'
    const client =twilio(accountSID,authToken);
    const isOtp = await client.verify.services(serviveSSID).verificationChecks.create({
        to:   `+91${mobile}`,
        code:otp
    }).then((resp) => {
        console.log('otp res ',resp);
        return resp
    }).catch(error=>{
        console.log(error);
    })
    console.log("is otp......",isOtp.valid);
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

        if(user){
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