import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createAccessToken = user => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
};

const createRefreshToken = user => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15d" },
  );
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const createUser = async (req, res) => {
  const { name, email, password, role, isActive } = req.validated.body;

  if (!name || !email || !password || !role) {
    const err = new Error("Name, email, password and role are required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email });

  if (user) {
    const err = new Error("User already exists");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isActive: isActive ?? true,
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: { name: newUser.name, email: newUser.email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.validated.body;
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  if (!user.isActive) {
    const err = new Error("Account is inactive");
    err.statusCode = 403;
    throw err;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const accessToken = createAccessToken(user);
  const refreshTokenValue = createRefreshToken(user);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshTokenValue, {
    ...cookieOptions,
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: { name: user.name, email: user.email, role: user.role },
  });
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    const err = new Error("No refresh token provided");
    err.statusCode = 403;
    throw err;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    const err = new Error("Invalid or expired refresh token");
    err.statusCode = 403;
    throw err;
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  if (!user.isActive) {
    const err = new Error("Account is inactive");
    err.statusCode = 403;
    throw err;
  }

  const newAccessToken = createAccessToken(user);

  res.cookie("accessToken", newAccessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
  });
};

const logout = async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// Why .lean()? faster, no mongoose overhead, perfect for read-only.
const checkUser = async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json({
    success: true,
    user: { name: user.name, email: user.email, role: user.role },
  });
};

export default {
  createUser,
  login,
  refreshToken,
  logout,
  checkUser,
};
