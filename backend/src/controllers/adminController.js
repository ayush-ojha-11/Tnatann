import User from "../models/User.js";
import Product from "../models/Product.js";

//Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in admin controller ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.status(200).json(products);
  } catch {
    console.log("Error in admin controller", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Error in admin controller ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
