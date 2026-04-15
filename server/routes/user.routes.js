import express from "express";

const router = express.Router();

import userController from "../controllers/user.controller.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import authMiddleware from "../middlewares/auth.js";
// import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import {
  checkUserSchema,
  // createUserSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
} from "../validations/user.validation.js";

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(userController.login),
);
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  asyncHandler(userController.refreshToken),
);
router.post(
  "/logout",
  validate(logoutSchema),
  asyncHandler(userController.logout),
);
router.get(
  "/check-user",
  authMiddleware,
  validate(checkUserSchema),
  asyncHandler(userController.checkUser),
);

// User management
// router.post(
//   "/create-user",
//   authMiddleware,
//   authorizeRoles("super_admin"),
//   validate(createUserSchema),
//   asyncHandler(userController.createUser),
// );

export default router;
