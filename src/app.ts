import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { cors } from './middlewares/cors.middleware';
import authRoutes from './routes/auth';
import aboutRoute from './routes/about';
import blogRoutes from './routes/blog';
import { authMiddleware } from './middlewares/auth.middleware';
import { errorHandler } from './errors/error.middleware';
import bootsrap from './bootsrap';

bootsrap();

const app = express();

app.use(express.json());

app.use(compression());
app.use(helmet());

// Global middlewares (order matters)
app.use(cors);

// Routes
app.use('/auth', authRoutes);
app.use('/posts', authMiddleware, blogRoutes);
app.use('/about', authMiddleware, aboutRoute);

// Global error handler (order matters)
app.use(errorHandler);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`App is runnning http://localhost:${port}.`);
});
