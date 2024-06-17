import express from "express";
import cors from "cors";
import connectDataBase from "./Libs/database.js";
import { globalErrorHandler } from "./GlobalErrorHandler/GErrorHandler.js";
import registerRouter from "./Routes/registerRouter.js";
import loginRouter from "./Routes/loginRouter.js";
import contactsRouter from "./Routes/contactsRouter.js";
import usersRouter from "./Routes/usersRouter.js";

//* Connecting our database: (./Libs/database.js)
await connectDataBase();

const app = express();

//* Express middleware to parse/read JSON data:
app.use(express.json());

//* Allowing users to access the server from different origins:
app.use(cors());

//* Routes:

app.use("/users", usersRouter);

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/contacts", contactsRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on the following port: ${port}`);
});

app.use(globalErrorHandler);
