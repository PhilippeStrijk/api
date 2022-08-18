import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { morganMiddleware, RouteNotFoundError, errorHandler, currentUser } from '../common';
import cookieSession from 'cookie-session';
import { authRoutes, mfaRoutes, ticketRoutes, orderRoutes } from './routes';
import cors from 'cors';

const app = express();

app.set('trust proxy', true);
app.use(cors({origin: ['*']}))
//middlewares
app.use(json());
app.use(morganMiddleware);
app.use(cookieSession({
    signed: false,
    secure: false
}));


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