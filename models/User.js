// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//     {
//         name:{type:String, required:true},
//         email:{type:String, required:true, unique:true},
//         password:{type:String, required:true},
//         isAdmin:{type:Boolean, required:true, default:false},
//     },
//     {
//         timestamps: true,
//     }
// );

// const User = mongoose.models.User || mongoose('User', userSchema);
// export default User;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;