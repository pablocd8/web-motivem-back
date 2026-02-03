const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const dateFilter = require("nunjucks-date-filter");
const methodOverride = require("method-override");
const cors = require("cors");

const PORT = process.env.PORT || 10000;
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web-motivem-database';

const app = express(); // <-- crear app primero

// ─── Configuración CORS ───
const allowedOrigins = ["https://web-motivem-8bo6.vercel.app"]; // frontend
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ─── Middlewares ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ─── Rutas ───
app.use("/api/talleres", require("./routes/pdf"));
app.use("/api/pdf",require("./routes/pdf"));

// ─── Conexión a MongoDB ───
mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// ─── Servidor ───
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor en puerto ${PORT} - http://localhost:${PORT}`);
});
