import './config/database'; // Database init
import 'dotenv/config.js'; // .env

import server from './config/server'

const PORT = process.env.PORT || 4444

server.listen(PORT, console.log("Server started at", PORT));