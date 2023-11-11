import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Joi from "joi";
import { USER_ROLES } from "../utils/constants.js";

const cookieoptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  // Secure : true
};

// create singup featue
const signUp = asyncHandler(async (req, res) => {
  // name, email,password, lastName, location, role
  // incoming data  validation
   console.log(req.body);
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8).max(30),
    lastName: Joi.string().required(),
    location: Joi.string().required(),
    role: Joi.string().valid(...Object.values(USER_ROLES)).required(),
  });

  // checking for errors`
  const { error } = schema.validate(req.body);
  if (error) {
    throw new CustomError(error, 401);
  }

  
  // checking for is user already exist
  const userExist = await User.findOne({ email: req?.body?.email });

  if (userExist) {
    throw new CustomError("user already exist ", 400);
  }

  // if theres no error or user dont exist already  so create new user
  const user = await User.create(req.body);
  
  if (!user) {
    throw new CustomError("user can not be created ", 400);
  }
  // generate jwt token
  const token = await user.getJWTtoken();
  
  //  safety
  user.password = undefined;
  res.cookie("token", token, cookieoptions);
  console.log(req.cookies);
  
  res.status(200).json({
    success: true,
    token,
    user,
  });
});

const login = asyncHandler(async (req, res) => {

  console.log(req.body);
  // console.log(req.cookie);
  // incoming data calidation
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  //   checking for error
  if (error) {
    throw new CustomError(error, 400);
  }

  //  getteing user form db by email
  const user = await User.findOne({ email: req?.body?.email }).select("+password");
  // checking is user found if not send error
  if (!user) {
    throw new CustomError("this email dose'nt exist", 400);
  }

  // checking password is it correct
  const isPasswordMatch = await user.comparepass(req?.body?.password);
  // checkign for password  if not matched throw error

  if (!isPasswordMatch) {
    throw new CustomError("wrong password ", 400);
  }

    if (isPasswordMatch) {
    // generate jwt token
    var token = await user.getJWTtoken();
    // for safty
    user.password = undefined;
    // set toking in cookies safly
    res.cookie("token", token, cookieoptions);
  }

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

const logout = asyncHandler(async (req, res) => {
    // set cookies  to null in user browsers
       res.cookie("token", null, {
         expires: new Date(Date.now()),
         httpOnly: true,
       });

       res.status(200).json({
         success: true,
         msg: "user logged out",
       });
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    throw new CustomError("users not found ", 400);
  }

  res.status(200).json({
    success: true,
    users,
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schema = Joi.string().required();

  const { error } = schema.validate(id);
  console.log(error);
  if (error) {
    throw new CustomError(error, 400);
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new CustomError("user not found", 400);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const deleteOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schema = Joi.string().required();

  const { error } = schema.validate(id);
  if (error) {
    throw new CustomError(error, 400);
  }

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    throw new CustomError("user can not be deleted ", 400);
  }

  res.status(200).json({
    success: true,
    deleted,
  });
});

const deleteAllUsers = asyncHandler(async (req, res) => {
  const deleted = await User.deleteMany();
  if (!deleted) {
    throw new CustomError("user  can't be  deleted", 400);
  }

  res.status(200).json({
    success: true,
    deleted,
  });
});

const updateOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schema = Joi.string().required();

  const { error } = schema.validate(id);
  if (error) {
    throw new CustomError(error, 400);
  }

  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new CustomError("user not exists ", 400);
  }

  const updateprofile = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateprofile) {
    throw new CustomError("user can not be updated", 400);
  }

  res.status(201).json({
    success: true,
    updateprofile,
  });
});

export {
  signUp,
  login,
  logout,
  getAllUsers,
  getProfile,
  deleteAllUsers,
  deleteOneUser,
  updateOneUser,
};
