const UserModel = require('../Models/UserModel.js')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

// get all users
const getAllUsers= async (req, res) => {
    try{
        let users = await UserModel.find()
        users=users.map((user)=>{
            const {password,...otherDetails}=user._doc;
            return otherDetails;
        })
        res.status(200).json(users)
    }catch(error){
        res.status(500).json(error)
    }
}

// get a user
const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc;

            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("No such user exists");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}



const updateUser = async (req, res) => {
    const id = req.params.id;
    // console.log("Data Received", req.body)
    const { _id, currentUserAdmin, password } = req.body;
    
    if (id === _id) {
      try {
        // if we also have to update password then password will be bcrypted again
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
        // have to change this
        const user = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWTKEY,
            { expiresIn: "1h" }
          );
          console.log({user, token})
          res.status(200).json({user, token});
        } catch (error) {
          console.log("Error agya hy")
          res.status(500).json(error);
        }
      } else {
        res
          .status(403)
          .json("Access Denied! You can update only your own Account.");
      }
};



// delete a user  
const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus } = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only delete your own profile");
    }
}

// Follow a User
const followUser = async (req, res) => {
    const id = req.params.id;

    const {_id } = req.body;

    if (_id === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("User is Already followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


// UnFollow a User
const UnFollowUser = async (req, res) => {
    const id = req.params.id;

    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User Unfollowed!");
            } else {
                res.status(403).json("User is not followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
module.exports = {
    UnFollowUser, 
    followUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
};