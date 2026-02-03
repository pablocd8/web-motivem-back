const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const dateFilter = require("nunjucks-date-filter");
const methodOverride = require("method-override");
const cors = require("cors");

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/Web-Motivem";

const app = express(); // <-- crear app primero

// ─── Configuración CORS ───
const allowedOrigins = ["http://localhost:5173"]; // frontend
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// ─── Middlewares ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ─── Rutas ───
app.use("/api/talleres", require("./routes/taller"));

// ─── Nunjucks ───
app.set("view engine", "njk");
const env = nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
env.addFilter("date", dateFilter);

// ─── Conexión a MongoDB ───
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// ─── Servidor ───
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT} - http://localhost:${PORT}`);
});
