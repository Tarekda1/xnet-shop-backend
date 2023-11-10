const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// User login route
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ status:401, error: "Invalid credentials" });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If username and password are valid, generate and return an access token
    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });
    res.status(200).json({
      accessToken,
      refreshToken,
      userId: user._id,
      name: user?.name,
      email: user?.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function signUp(req, res) {
  const { username, password, name, email, birthday } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      dateOfBirth: birthday,
    });

    await newUser.save();

    res.status(201).json({ sucess:"ok",message: "User registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

//get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

//get all users
async function getUserById(req, res) {
  try {
    const user = await User.findById(req?.params?.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

//update user by id
async function updateUserById(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req?.params?.id, req?.body, {
      new: true,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  login: login,
  signup: signUp,
  getAllUsers,
  getUserById,
  updateUserById,
};
