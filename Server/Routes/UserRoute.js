const express = require('express')
const {  getAllUsers,deleteUser, followUser, getUser, UnFollowUser, updateUser } =require('../Controllers/UserController.js');
const  authMiddleWare  = require('../MiddleWare/authMiddleWare');

const router = express.Router();

router.get('/',getAllUsers)
router.get('/:id', getUser)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare,deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare, UnFollowUser)


module.exports= router;