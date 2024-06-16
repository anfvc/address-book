import mongoose from "mongoose";

async function connectDataBase() {
  mongoose.connection.on("connected", () =>
    console.log("Database has been connected.")
  );
  mongoose.connection.on("error", (error) =>
    console.log("Error: Database failed to connect.", error)
  );

  //* Connecting to address-db using a connection string:
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

export default connectDataBase;
