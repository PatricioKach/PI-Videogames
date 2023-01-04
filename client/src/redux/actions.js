import axios from "axios";

export const getVideogames = () => {
  return async (dispatch) => {
    let pedidoBack = await axios.get("http://localhost:3001/videogames");

    return dispatch({ type: "GET_VIDEOGAMES", payload: pedidoBack.data });
  };
};

export const getVideogamesByName = (name) => {
  return async (dispatch) => {
    let pedidoBackName = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    return dispatch({
      type: "GET_VIDEOGAMES_BY_NAME",
      payload: pedidoBackName.data,
    });
  };
};

export const getVideogameByID = (id) => {
  return async (dispatch) => {
    let pedidoId = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({ type: "GET_VIDEOGAME_BY_ID", payload: pedidoId.data });
  };
};

export const getGenres = () => async (dispatch) => {
  let pedidoGenresBack = await axios.get("http://localhost:3001/genres");
  dispatch({ type: "GET_GENRES", payload: pedidoGenresBack.data });
};

export const filterVideogameAlph = (payload) => {
  return {
    type: "FILTER_VIDEOGAME_ALPH",
    payload,
  };
};

export const filterByGenre = (payload) => {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
};

export const filterByUbication = (payload) => {
  return {
    type: "FILTER_BY_UBICATION",
    payload,
  };
};

export const createVideogame = async (payload) => {
  const newVideogame = {
    name: payload.name,
    image: payload.image,
    description: payload.description,
    released: payload.released,
    rating: payload.rating,
    platform: payload.platform,
  };
  await axios
    .post("http://localhost:3001/videogames", newVideogame)
    .then(alert("creado con exito"));

  return {
    type: "CREATE_VIDEOGAME",
  };
};
