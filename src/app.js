import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import v1Routes from './routes/v1/index.js';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', process.env.CLIENT_URL].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads',express.static('uploads'));
//SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// app.use('/api/auth',authRouthes);
// app.use('/api/notices',noticeRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/team', teamRoutes);

app.use('/api/v1', v1Routes);
app.get('/api/test',(req,res)=>{
    res.json({
        status: "success",
        message: "API is running"
    });
});

app.get('/api/v1/test',(req,res)=>{
    res.json({
        status: "success",
        message: "API v1 is running"
    });
});

// Global error handler
app.use(globalErrorHandler);

// 404
app.use((req,res)=>{
    res.status(404).json({
        status: "error",
        message: "API route not found",
        code: 404,
        errors: {}
    });
});

export default app;