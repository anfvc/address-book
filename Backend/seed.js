import connectDataBase from "./Libs/database.js";
import User from "./Models/User.js";
import Contact from "./Models/Contact.js";
import { hash } from "bcrypt";

try {
  console.log("Database is about to be seeded with supporting data.");

  await connectDataBase();

  //? Using the User model to delete any documents that already exist in the "users" collection:
  await User.deleteMany({});
  //? Using the User model to delete any documents that already exist in the "contacts" collection:
  await Contact.deleteMany({});

  const test1 = await hash("Test123!", 10);
  const test2 = await hash("Test234!", 10);
  const test3 = await hash("Test345!", 10);

  const supportingData = [
    {
      email: "test1@test1.com",
      username: "test1",
      password: test1,
      address: "Avenue 123",
      phone: "012314223",
      contacts: [],
    },
    {
      email: "test2@test2.com",
      username: "test2",
      password: test2,
      address: "Avenue 222",
      phone: "0231212223",
      contacts: [],
    },
    {
      email: "test3@test3.com",
      username: "test3",
      password: test3,
      address: "Avenue 342",
      phone: "02312122329",
      contacts: [],
    },
  ];

  //? Using the above "supportingData" to insert mock data into "users" collection:
  await User.insertMany(supportingData);

  console.log("Database has been successfully seeded with supporting data.");

  //? Terminate process with success code:
  process.exit(0);
} catch (error) {
  console.log(error);
  //? Terminate process with failure code:
  process.exit(1);
}
