import User from "../models/User.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email.toLowerCase()})

    if(user) {
      return res.status(400).json({
        success: false,
        message: 'An account is already associated with that email address.'
      })
    }

    const generatedIdName = req.body.email.split('@')[0]

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password_hash: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      college: req.body.college
    });

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    newUser.password_hash = hash

    const userResult = await newUser.save()

    return res.status(200).json({
      success: true,
      id: userResult._id
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'An error occurred.'
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email.toLowerCase()})

    if(!user) {
      return res.status(400).json({
        success: false,
        message: 'Oopsie, we could not find a user associated with that email address.'
      })
    }

    const result = await bcrypt.compare(req.body.password, user.password_hash)

    if (result == false) {
      return res.status(200).json({
        success: false,
        message: 'Incorrect password'
      })
    }

    const token = jwt.sign({
      email: user.email,
      id: user._id,
      login_time: Date.now()
    }, process.env.JWT_KEY)

    return res.status(200).json({
      success: true,
      token: token
    })

  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'An error occurred.'
    })
  }
}