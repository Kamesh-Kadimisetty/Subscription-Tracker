import express from 'express';
import CookieParser from 'cookie-parser';

import { PORT } from './config/env.js'; 

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js';
import arjcetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(arjcetMiddleware);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

app.use(errorMiddleware);
app.get('/', (req, res) => {
    res.send("Welcome to Subscription Tracker!")
});

app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    await connectToDatabase();
});

export default app;

// {
//     "name":"Netflix Preminum",
//     "price":15.99,
//     "currency":"INR",
//     "frequency":"monthly",
//     "category":"entertainment",
//     "startDate":"2026-01-20T16:34:55.714+00:00",
//     "paymentMethod":"upi"
//   }