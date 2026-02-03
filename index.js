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

// ─── Middleware para manejar preflight OPTIONS requests ───
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return res.sendStatus(200);
  }
  next();
});

// ─── Middlewares ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ─── Rutas ───
app.use("/api/pdf", require("./routes/pdf"));


// ─── Conexión a MongoDB ───
mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// ─── Servidor ───
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor en puerto ${PORT} - http://localhost:${PORT}`);
});
