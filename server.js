import { setupExpressApp } from "./app.js";
import os from "node:os"
import { config } from "dotenv";
import cluster from "node:cluster"
import db from "./models/index.js"

config();

const PORT = parseInt(process.env.PORT) || 3000
const NODE_ENV = process.env.NODE_ENV || "development"
const WORKER_COUNT = NODE_ENV === "production" ? Math.max(Math.floor(os.cpus().length), 1) : 1

async function startServer() {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ alter: true });
        const app = setupExpressApp();
        const server = app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} - (${NODE_ENV} mode)`);
        })
        return server;
    } catch (error) {
        console.log('Error starting the server', error);
        process.exit(1);
    }

}

if (cluster.isPrimary) {
    for (let i = 0; i < WORKER_COUNT; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`);
        setTimeout(() => {
            console.log('Starting new worker...');
            cluster.fork()
        }, 3000)
    })
}
else {
    startServer();
}