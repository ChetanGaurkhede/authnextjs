import mongoose from "mongoose";


// connection function hold the connection of the DB
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!); // "!" added for checking type sefty to check wether url is present or not if its undefined it will not throu err

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongo db connection established");
    });

    connection.on("error", (err) => {
      console.log("db connection failed make sure db running", err);
      process.exit();
    });
     
  } catch (error) {
    console.log("Mongo DB connection error : ", error);
  }
}
