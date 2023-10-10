import express from "express";
import { body } from "express-validator";
import { currentUser, validateRequest } from "../middlewares";
import { signup, login, getCurrentUser } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  login
);

router.get("/currentuser", currentUser, getCurrentUser);

export { router as userRouter };
