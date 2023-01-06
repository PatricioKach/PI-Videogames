import axios from "axios";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      const pedidoBack = await axios.get("http://localhost:3001/videogames");

      return dispatch({ type: "GET_VIDEOGAMES", payload: pedidoBack.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
};

export const getVideogamesByName = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let pedidoBackName = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_VIDEOGAMES_BY_NAME",
        payload: pedidoBackName.data,
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
};

export const getVideogameByID = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let pedidoId = await axios.get(`http://localhost:3001/videogame/${id}`);
      return dispatch({ type: "GET_VIDEOGAME_BY_ID", payload: pedidoId.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
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
  try {
    await axios
      .post("http://localhost:3001/videogames", newVideogame)
      .then(alert("creado con exito"));

    return {
      type: "CREATE_VIDEOGAME",
    };
  } catch (error) {
    alert("hubo un error");
  }
};
