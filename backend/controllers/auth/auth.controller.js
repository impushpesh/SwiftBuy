//import { generateTokenAndSetCookie } from "../../lib/utils/generateToken.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({success: false, message: "All fields are mandatory" });
    }

    if (username === null || username === undefined) {
      return res.status(400).json({success: false, message: "Invalid username" });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({success: false, message: "Password must be atleast 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    if (!newUser) {
      return res.status(400).json({success: false, message: "Error creating user" });
    }
    if (newUser) {
      await newUser.save();

      return res.status(201).json({success: true, message: "User created successfully" });
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Login
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d"}
    )
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      }
    })
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({success: false, error: "Internal Server Error. Please try again" });
  }
};

// Logout
const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({success: false, error: "Internal Server Error" });
  }
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

export { signUp, signIn, signOut, authMiddleware };
