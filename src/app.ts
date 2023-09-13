import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { userRoute } from './routes/user.route.js';
import { groupRoute } from './routes/group.route.js';
import { authorize } from './middleware/auth.js';

export const app = express();
export const server = createServer(app);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cors());
app.use(cookieParser());

// auth routes
app.use('/api/v1', userRoute);

//  test route
app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// authorizing routes
app.use(authorize);

// group routes
app.use('/api/v1/group', groupRoute);
