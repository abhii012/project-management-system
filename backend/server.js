require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes=require('./routes/productRoutes')

const app=express()
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin.includes("vercel.app") ||
      origin.includes("localhost")
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.options("*", cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(console.error);



app.use('/api',productRoutes)

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);