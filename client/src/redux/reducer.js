const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  genres: [],
  nameFilter: "",
  loading: false,
  error: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        nameFilter: "",
        loading: false,
        error: "",
      };
    case "GET_VIDEOGAMES_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
        loading: false,
        error: "",
      };

    case "GET_VIDEOGAME_BY_ID":
      return {
        ...state,
        videogameDetail: action.payload,
        loading: false,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "FILTER_VIDEOGAME_ALPH":
      let arr = [];

      if (action.payload === "a-z") {
        arr = [
          ...state.allVideogames.sort((a, b) =>
            a.name.localeCompare(b.name.toLowerCase())
          ),
        ];
      }
      if (action.payload === "z-a") {
        arr = [
          ...state.allVideogames.sort((a, b) =>
            b.name.localeCompare(a.name.toLowerCase())
          ),
        ];
      }
      if (action.payload === "choose") {
        arr = state.videogames;
      }
      return {
        ...state,
        videogames: [...arr],
        nameFilter: action.payload,
      };

    case "FILTER_BY_GENRE":
      const filterGenre = state.allVideogames.filter((e) =>
        e.genres.includes(action.payload)
      );
      if (action.payload === "choose") {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          videogames: [...filterGenre],
          nameFilter: action.payload,
        };
      }
    case "FILTER_BY_UBICATION":
      const filterUbiAPI = [
        ...state.allVideogames.filter((e) => e.id.toString().length < 10),
      ];
      const filterUbiDB = [
        ...state.allVideogames.filter((e) => e.id.length > 10),
      ];
      if (action.payload === "created") {
        return {
          ...state,
          videogames: [...filterUbiDB],
          nameFilter: action.payload,
        };
      } else if (action.payload === "existing") {
        return {
          ...state,
          videogames: [...filterUbiAPI],
          nameFilter: action.payload,
        };
      }
    case "CREATE_VIDEOGAME":
      return {
        ...state,
        videogames: [...state.videogames],
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
