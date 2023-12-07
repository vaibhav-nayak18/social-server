import { PORT } from "./config/env.js";
import { server } from "./app.js";
import { connectDb } from "./config/database.js";

connectDb();

import "./config/socket.js";

server.listen(PORT, () => {
  console.log(`url - http://localhost:${PORT}`);
});
