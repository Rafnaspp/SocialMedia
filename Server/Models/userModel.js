import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username:{
            type : String,
            required: true
        },
        password : {
            type : String,
            required: true
        },
        firstname: {
            type : String,
            required: true
        },
        lastname:{
            type : String,
            required: true
        },
        mobile:{
            type : Number,
            required: true
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        block : {
            type : Boolean,
            default : false
        },
        profilePicture : String,
        coverPicture : String,
        about : String,
        livesin : String,
        worksAt : String,
        country: String,
        relationship : String,
        followers :[],
        following : []
    },
    {timestamps : true}
)

const UserModel = mongoose.model("Users", userSchema);
export default UserModel