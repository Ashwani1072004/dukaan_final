const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const productRoutes = require("./routes/productRoute.js");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Allowed CORS origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://apni-dukaan-seven.vercel.app",
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// JSON parser middleware
app.use(express.json());

// Logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to e-commerce app",
  });
});

// Server port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`.bgBlue
  );
});
