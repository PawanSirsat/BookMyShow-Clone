const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require("../middlewares/authMiddleware");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return res.status(400).send({
        success: false,
        message: "This email address is already registered.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user',
      verificationStatus: req.body.verificationStatus || 'pending',
      phone: req.body.phone || '',
      address: req.body.address || ''
    });

    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully. Please log in.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({
      success: false,
      message: "Failed to register user. Please try again later.",
    });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.send({
      success: true,
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({
      success: false,
      message: "Failed to login. Please try again later.",
    });
  }
});

// Get current user details (Protected Route)
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    res.send({
      success: true,
      message: "User data fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch user data. Please try again later.",
    });
  }
});

module.exports = router;
