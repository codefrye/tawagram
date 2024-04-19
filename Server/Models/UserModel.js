const { default: mongoose } = require("mongoose");

const UserSchema=mongoose.Schema(
{
    username:{type : String, required : true},
    password:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    isAdmin:{
        type:Boolean,
        default:false,
    },
    profilePicture:String,
    coverPicture:String,
    worksAt:String,
    relationship:String,
    about:String,
    favoritefood:String,
    livesin:String,
    country:String,
    followers:[],
    following:[]          


},{timestamps:true})

const userModel=mongoose.model("Users",UserSchema)
module.exports=userModel;