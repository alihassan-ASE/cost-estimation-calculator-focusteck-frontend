import mongoose from "mongoose";

let isConnected = false;
const options = {
    dbName: "dummydb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, options)
    isConnected = true;
    console.log("MongoDB connected")
  } catch (err) {
    console.log(err);
  }
};
