import app from "./src/app.js";
import connectDb from "./src/config/db.js";

const PORT =  3000;

app.listen(PORT, () => {
  connectDb()

  console.log(`🚀 Image Service running on port ${PORT}`);
});
