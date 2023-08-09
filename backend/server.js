const app = require('./app');
const connectDatabase = require('./db/database');

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });



connectDatabase();

//Create Server
const server = app.listen(8000, () => {
    console.log(
      `Server is running on http://localhost:${8000}`
    );
  });

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  