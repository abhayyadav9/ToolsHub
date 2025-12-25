import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/image.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import pdfRouter from "./routes/pdf.route.js";
import { trackActivity } from "./middlewares/activityTracker.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/image", routes);
app.use("/api/pdf", pdfRouter);

app.get("/status", trackActivity("user-arrived-on-page"),(req, res) => {
  console.log("startus")
  res.status(200).json({ status: "Server is up and running!" });
});


app.use(errorHandler);

export default app;
