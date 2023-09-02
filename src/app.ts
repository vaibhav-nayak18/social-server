import express from 'express';
import { createServer } from 'http';
import { z } from 'zod';
export const app = express();
export const server = createServer(app);

const obj = {
    name: 'test',
    age: '18',
};

const FormateData = z.object({
    name: z.string(),
    age: z.number(),
});

const data = FormateData.safeParse(obj);
console.log(data.success);
// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
