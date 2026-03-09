import mongoose from "mongoose";

const dbConnect = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database has been connected!");
  } catch (err) {
    console.log("Server failed to connect to Database");
    console.log(err);
  }
};

export { dbConnect };
