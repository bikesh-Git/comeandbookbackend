import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from '../util/error.js '
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  console.log(req.body)
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
     ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
   const user = await User.findOne({username:req.body.username})
   if(!user) return next(createError( 404,"user not found"))

   const isPassword = await bcrypt.compare(req.body.password, user.password)
   if(!isPassword) return next(createError( 400 ,"wrong password and username"))
    const {password, isAdmin ,...other} = user._doc

    const token = jwt.sign({
      id:user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT, { expiresIn: '1h' });

    res.cookie("access_token",token,{
        httpOnly:true,
    }).status(200).json({details:{...other},isAdmin});
  }
  
   catch (err) {
    next(err);
  }
};
