import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { formatIstDateTime } from "./utils/timeUtils.js";

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const CLIENT_URL = process.env.CLIENT_URL;

const isLocalOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (NODE_ENV === 'development' && isLocalOrigin(origin)) {
    return true;
  }

  return Boolean(CLIENT_URL && origin === CLIENT_URL);
};

// Middleware - Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware - Cookie Parser
app.use(cookieParser());

// Middleware - CORS
app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('CORS origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware - Request Logger (Development)
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${formatIstDateTime()} ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use("/api/v1", routes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: formatIstDateTime() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      status: 404,
    },
  });
});

// Error Handling Middleware
app.use(errorMiddleware);

export default app;