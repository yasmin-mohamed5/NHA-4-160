import dotenv from 'dotenv';
import path from 'path';

// Load .env
const envPaths = [
  path.join(__dirname, '.env'),
  path.join(__dirname, '..', '.env'),
  path.join(process.cwd(), 'backEnd', 'src', '.env'),
  path.join(process.cwd(), '.env'),
];

for (const envPath of envPaths) {
  const result = dotenv.config({ path: envPath });

  if (!result.error) {
    console.log(`Loaded .env from: ${envPath}`);
    break;
  }
}

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swagger/schemas';

import connectDB from './config/db';

const app: Application = express();


// ================================
// Middleware
// ================================

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Parse cookies
app.use(cookieParser());

// HTTP request logger
app.use(morgan('dev'));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

// ================================
// Routes
// ================================

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Backend API is running',
  });
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
import authRoutes from './routes/auth/authRoutes';
import adminPlans from './routes/admin/planRoutes';
import academyDetails from "./routes/teacher/academyRoutes";
import adminUserRoutes from "./routes/admin/adminUserRoutes";
import adminAcademyRoutes from "./routes/admin/adminAcademyRoutes";
app.use('/api/auth', authRoutes);
app.use('/api/admin/plans', adminPlans);
app.use('/api/admin/adminUserRoutes', adminUserRoutes);
app.use('/api/admin/adminAcademyRoutes', adminAcademyRoutes);
app.use('/api/teacher', academyDetails);

// app.use('/api/users', userRoutes);


// ================================
// 404 Handler
// ================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});


// ================================
// Global Error Handler
// ================================

app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
);


// ================================
// Start Server
// ================================

const PORT = process.env.PORT ||3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;