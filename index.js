const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");

const PORT = process.env.PORT || 10000;
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web-motivem-database';

const app = express();

// ─── Configuración CORS ───
const allowedOrigins = [
  "http://localhost:5173",                // frontend local
  "http://127.0.0.1:5173",                
  "https://web-motivem-8bo6.vercel.app"  // frontend Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permite Postman/curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS no permite ${origin}`), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// ─── Middlewares ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ─── Rutas ───
app.use("/api/pdf", require("./routes/pdf"));
app.use("/api/auth", require("./routes/auth"));



// ─── Conexión a MongoDB ───
mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// ─── Servidor ───
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor en puerto ${PORT} - http://localhost:${PORT}`);
});
