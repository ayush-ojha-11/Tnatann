import express from "express";
import {
  getUsers,
  getAllProducts,
  deleteUser,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, checkRole(["admin"]), getUsers);
router.get("/products", protect, checkRole(["admin"]), getAllProducts);
router.delete("/users/:id", protect, checkRole(["admin"]), deleteUser);

export default router;
