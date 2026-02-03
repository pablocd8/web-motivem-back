const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/descargar", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No autorizado. Debes iniciar sesión."
        });
    }

    const filePath = path.join(__dirname, "../files/guia-para-familias.pdf");

    res.download(filePath, "guia-para-familias.pdf");
});

module.exports = router;
