import { PORT } from './config/env.js';
import { server } from './app.js';
import { connectDb } from './config/database.js';

connectDb();

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
