const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const {
  getVideogames,
  getVideogameByID,
  createVideogame,
  getGenres,
  deleteVideogame,
} = require("./videogame/controller");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", getVideogames);

router.get("/videogame/:id", getVideogameByID);

router.post("/videogames", createVideogame);

router.get("/genres", getGenres);

router.delete("/videogames/:id", deleteVideogame);
module.exports = router;
