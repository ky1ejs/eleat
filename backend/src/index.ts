import { startServer } from 'src/startServer';

const shutdown = async () => {
  console.log("Shutting down gracefully...");
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

startServer();
