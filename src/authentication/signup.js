/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Names
 *         - email
 *         - password
 *       properties:
 *         userId:
 *           type: string
 *           description: The auto-generated ID of the user
 *         Names:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         picture:
 *           type: string
 *           description: The user's picture URL
 *         password:
 *           type: string
 *           description: The password of the user
 *         Username:
 *           type: string
 *           description: The username of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *         otpExpiresAt:
 *           type: string
 *           description: The OTP expiration time
 *         otp:
 *           type: string
 *           description: The OTP for email verification
 *         token:
 *           type: string
 *           description: The user's token
 *         verified:
 *           type: boolean
 *           description: Whether the user is verified
 *         active:
 *           type: boolean
 *           description: Whether the user is active
 *       example:
 *         userId: 60d0fe4f5311236168a109ca
 *         Names: John Doe
 *         email: john.doe@example.com
 *         picture: http://example.com/picture.jpg
 *         password: pass1234
 *         Username: johndoe
 *         role: user
 *         otpExpiresAt: 2021-06-22T14:48:00.000Z
 *         otp: 123456
 *         token: jwt.token.here
 *         verified: false
 *         active: true
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Email is already in use
 *       500:
 *         description: Some server error
 */




import "../models/users.js";
import cron from "node-cron";
import mongoose from "mongoose";
import { catchAsync } from "../middlewares/globaleerorshandling.js";
import { User } from "../models/users.js";
import { passHashing, tokengenerating } from "../utils/index.js";
import { sendEmail } from "../utils/index.js";
import { signupHtmlMessage } from "../utils/index.js";
import { generateOTP } from "../utils/index.js";

const scheduleUserDeletion = (userId, signupTime) => {
  const deletionTime = new Date(signupTime.getTime() + 3 * 60 * 1000) // 6 minutes later

  const cronExpression = `${deletionTime.getMinutes()} ${deletionTime.getHours()} * * *`

  cron.schedule(cronExpression, async () => {
    try {
      const user = await User.findById(userId)
      if (user && !user.verified) {
        let deleted = await User.findByIdAndDelete(userId)
      }
    } catch (error) {
      console.error('Error deleting unverified user:', error.message)
    }
  })
}

export const signup = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).json({
      message: 'Email is already in use.'
    })
  }

  let hashedPassword = await passHashing(req.body.password)
  let newUserDetails = { ...req.body, password: hashedPassword }

  const otpDetails = generateOTP()
  const verificationToken = otpDetails.code
  const otpExpiresAt = otpDetails.expiresAt
  newUserDetails.otp = verificationToken
  newUserDetails.otpExpiresAt = otpExpiresAt
  const verificationLink = `https://routeeasyapi.onrender.com/auth/verify-email?token=${verificationToken}`
  let newUser = await User.create(newUserDetails)

  // await sendEmail(newUser.email, "signup", "Thank you for registering with us!", signupHtmlMessage(verificationLink));

  let token = tokengenerating({ _id: newUser._id, email: newUser.email,user:newUser })

  res.status(200).json({
    message: 'User registered successfully',
    accesstoken: token,
    userinfomation: {
      email: newUser.email,
      Names: newUser.Names, 
      Username: newUser.Username,
      phoneNumber: newUser.phoneNumber,
      location: newUser.location,
      role: newUser.role,
      // active:newUser.active !== undefined ? active : true
    }
  })

  // scheduleUserDeletion(newUser._id, newUser.createdAt);
})
