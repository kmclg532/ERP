import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("server/.env") });

import connectDB from "./database/connection.js";
import { seedTestUsers } from "./database/seedUsers.js";
import { validateEnv } from "./config/env/validateEnv.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  try {
    validateEnv();

    // Connect to MongoDB
    await connectDB();

    // Seed phase 1.1 test users
    await seedTestUsers();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${NODE_ENV}`);
      console.log(`✓ API Base: http://localhost:${PORT}/api/v1\n`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('✗ Unhandled Rejection:', err);
  process.exit(1);
});

startServer();