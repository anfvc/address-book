import express from "express";
import cors from "cors";
import connectDataBase from "./Libs/database.js";
import { globalErrorHandler } from "./GlobalErrorHandler/GErrorHandler.js";

//* Connecting our database: (./Libs/database.js)
await connectDataBase();

const app = express();

//* Express middleware to parse/read JSON data:
app.use(express.json());

//* Allowing users to access the server from different origins:
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on the following port: ${port}`);
});

app.use(globalErrorHandler);
