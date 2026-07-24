import "dotenv/config" 
import express from "express";
import cors from "cors";

import db from "./config/db.js";
import router from "./routes/form.js";


const app = express();

db();

const allowedOrigins = [
  "http://localhost:5173",
  "https://uploadformrailway.netlify.app",
];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});



app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});