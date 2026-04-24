import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../.env"),
});


import connectDB from "./database/connection.js";
import { seedTestUsers } from "./database/seedUsers.js";
import { validateEnv } from "./config/env/validateEnv.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    // ✅ Validate env before anything
    validateEnv();

    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Seed test users (only in development)
    if (NODE_ENV === "development") {
      await seedTestUsers();
    }
    // await seedTestUsers();

    // ✅ Trust proxy (important for cookies in production)
    if (NODE_ENV === "production") {
      app.set("trust proxy", 1);
    }

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${NODE_ENV}`);

      if (NODE_ENV === "development") {
        console.log(`✓ API Base: http://localhost:${PORT}/api/v1\n`);
      }
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

// ✅ Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("✗ Unhandled Rejection:", err);
  process.exit(1);
});

startServer();