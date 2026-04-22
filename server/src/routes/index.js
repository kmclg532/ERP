import express from "express";
import authRoutes from "./authRoutes.js";
import organizationRoutes from "./organizationRoutes.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    data: null,
    message: "API is working 🚀"
  });
});

// Auth Routes
router.use("/auth", authRoutes);

// Organization Routes
router.use("/organizations", organizationRoutes);

export default router;