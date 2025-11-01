import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default { create, userByID, read, list, remove, update };  
 

/*import UserModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {

    try{
         const users = await UserModel.find();
         res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {

    try{
         const user = await UserModel.findById(req.params.id);
         if (!user){
            return res.status(404).json({message: "User not found" })
         }
         res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const createUser = async (req, res) => {

    try{
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();

         res.status(200).json(savedUser);
         
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



export const updateUserById = async (req, res) => {

    try{
         const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true});

         if (!updatedUser){
            return res.status(404).json({message: "User not found" })
         }
         res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const deleteUserById = async (req, res) => {

    try{
         const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

         if (!deletedUser){
            return res.status(404).json({message: "User not found" })
         }
         res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteAllUsers = async (req, res) => {

    try{
         const deleteAllUser = await UserModel.deleteMany();
         res.status(200).json({message: "All deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
*/