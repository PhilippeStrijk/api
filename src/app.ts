import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { morganMiddleware, RouteNotFoundError, errorHandler, currentUser } from '../common';
import cookieSession from 'cookie-session';
import { authRoutes, mfaRoutes, ticketRoutes, orderRoutes } from './routes';
import cors from 'cors';

const app = express();

const allowCrossDomain = (req:Request, res:Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.set('trust proxy', true);
app.use(cors({
    origin: "https://62ffb489613477006ac38997--marvelous-cupcake-a8a9a5.netlify.app",
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
    
}))
//middlewares
app.use(json());
app.use(morganMiddleware);
app.use(cookieSession({
    signed: false,
    secure: false
}));

app.use(allowCrossDomain);
//routes
app.use('/api', authRoutes);
app.use('/api', mfaRoutes);

app.use(currentUser);
app.use('/api', ticketRoutes);
app.use('/api', orderRoutes);
//non existing routes throw general error
app.all('*', async (req: Request, res: Response, next: NextFunction) => { 
    throw new RouteNotFoundError({ message: "Route Not Found" });
});

app.use(errorHandler);

export { app };