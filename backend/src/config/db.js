import mongoose from "mongoose";


const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://abhayYadav:abhayYadav@cluster0.zjd0amo.mongodb.net/?retryWrites=true&w=majority/toolshub');
    console.log("database connected successfully");
  } catch (error) {
    console.log("unable to connect with database");
    console.log(error);
  }
};

export default connectDb;
