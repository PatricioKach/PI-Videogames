require("dotenv").config();
const axios = require("axios");
const { Videogame, Genres } = require("../../db.js");
const { apiKey } = process.env;

//------------------------------------------------------

///HECHO
const getVideogames = async (req, res) => {
  const { name } = req.query;
  let arrayReq = [];
  for (let i = 1; i < 6; i++) {
    let pedido = await axios.get(
      `https://api.rawg.io/api/games?key=${apiKey}&page=${i}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );

    pedido.data.results.map((e) => {
      arrayReq.push({
        name: e.name,
        image: e.background_image,
        genres: e.genres.map((e) => e.name).join(", "),
        released: e.released,
        id: e.id,
      });
    });
  }

  const dbName = await Videogame.findAll({
    include: Genres,
  });

  const dbNameMap = dbName.map((e) => {
    return {
      name: e.name,
      image: e.background_image,
      genres: e.genres.map((e) => e.name),
      released: e.released,
      id: e.id,
    };
  });

  const all = [...arrayReq, ...dbNameMap];

  try {
    if (!name) {
      res.status(200).send(all);
    } else {
      const allName = all.filter((e) =>
        e.name.toLowerCase()?.includes(name.toLowerCase())
      );

      !allName.length
        ? res.status(404).send("Videogame not found")
        : res.status(200).send(allName.slice(0, 15));
    }
  } catch (error) {
    res.json(error);
  }
};

//------------------------------------------------------
//HECHO
const getVideogameByID = async (req, res) => {
  try {
    const { id } = req.params;
    let apiDetail;
    if (id.length > 10) {
      const DbDetail = await Videogame.findByPk(id);

      res.json(DbDetail);
    } else {
      const pedido = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${apiKey}`,
        { headers: { "accept-encoding": "*" } }
      );
      apiDetail = {
        name: pedido.data.name,
        image: await pedido.data.background_image,
        id: pedido.data.id,
        genre: pedido.data.genres.map((e) => e.name),
        description: await pedido.data.description.replace(/<[^>]+>/g, ""),
        released: pedido.data.released,
        rating: await pedido.data.rating,
        platforms: await pedido.data.metacritic_platforms
          ?.map((e) => e.platform.name)
          .join(", "),
      };
      res.status(200).send(apiDetail);
    }
  } catch (error) {
    res.status(404).send("No se encuentra el videojuego buscado");
  }
};

//--------------------------------------------------------
//HECHO
const createVideogame = async (req, res) => {
  try {
    const { name, image, genres, description, released, rating, platform } =
      req.body;

    const creaVG = await Videogame.create({
      name: name,
      image: image,
      description: description,
      released: released,
      rating: rating,
      platform: platform,
    });

    const aux = await Genres.findAll({
      where: {
        name: genres,
      },
    });

    await creaVG.addGenres(aux);

    res.status(200).json(creaVG);
  } catch (error) {
    res.json(error);
  }
};
//--------------------------------------------------------------
//HECHO
const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVG = await Videogame.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send("eliminado");
  } catch (error) {
    res.status(404).send("no se pudo eliminar");
  }
};

//----------------------------------------------------------------------

const getGenres = async (req, res) => {
  try {
    const genreDB = await Genres.findAll();
    const pedidoGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${apiKey}`,
      { headers: { "accept-encoding": "*" } }
    );

    if (!genreDB.length) {
      const apiGenres = await pedidoGenres.data.results.map((e) => {
        return { name: e.name };
      });

      const bulkGenre = await Genres.bulkCreate(apiGenres);
      bulkGenre.map((e) => {
        return {
          name: e.name,
        };
      });
      res.send(bulkGenre);
    } else {
      res.send(genreDB);
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getVideogames,
  getVideogameByID,
  createVideogame,
  getGenres,
  deleteVideogame,
};
