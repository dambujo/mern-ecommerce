const app = require("./app");

const dotenv = require("dotenv");
const connectDB = require("./config/database"); 

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

// config
dotenv.config({path:"backend/config/config.env"})

// connect to database
connectDB();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
}) 

// Unhandle Promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandle Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
}
)