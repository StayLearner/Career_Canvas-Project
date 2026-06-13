import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from"./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";

dotenv.config({});

const app = express();

const  _dirname= path.resolve();

const PORT = process.env.PORT || 8000;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(helmet);
app.use(mongoSanitize);
app.use(rateLimit({
  windowMs:15*60*1000,
  max: 100,
  message:{
      success: false,
      message: "Too many requests, please try again later.",
  }
})
);

app.use(morgan("dev"));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://career-canvas.onrender.com",
    "https://careercanvas.online",
    "https://www.careercanvas.online"

  ],
  credentials:true
}
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // for swagger docs





// APIs

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get( '*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
}) 

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });