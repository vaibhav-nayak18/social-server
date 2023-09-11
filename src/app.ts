import express from 'express';
import { createServer } from 'http';
import { userRoute } from './routes/user.route.js';

export const app = express();
export const server = createServer(app);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', userRoute);
