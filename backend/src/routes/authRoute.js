import {
  changeRole,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/changerole", protect, changeRole);

export default router;
