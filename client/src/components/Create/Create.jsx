import React from "react";
import { useEffect } from "react";
import { createVideogame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import style from "../Create/Create.module.css";

export default function Create() {
  const estadoGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    genres: [],
    platforms: [],
  });

  const [rightErrors, setRightErrors] = useState("");

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const validate = (videogame) => {
    let rightErrors = {};
    if (!videogame.name.length) rightErrors.name = "Debe ingresar un name";
    if (!videogame.description.length)
      rightErrors.description = "Debe ingresar un description";
    if (!videogame.released.length)
      rightErrors.released = "Debe ingresar released";
    if (!videogame.rating.length) rightErrors.rating = "Debe indicar el rating";
    if (!videogame.platforms.length)
      rightErrors.platforms = "Debe indicar el platforms";
    if (!videogame.genres.length) rightErrors.genres = "Debe indicar el genres";
    // if (!videogame.image.length) rightErrors.image = "Debe indicar el image";

    return rightErrors;
  };

  const deleteGenre = (value) => {
    const currentArray = videogame.genres;
    const index = currentArray.indexOf(value);
    currentArray.splice(index, 1);
    setVideogame({
      ...videogame,
      genres: currentArray,
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "genres") {
      const currentArray = videogame.genres;
      if (!currentArray.includes(e.target.value)) {
        currentArray.push(e.target.value);
      } else return;

      setVideogame({
        ...videogame,
        [e.target.name]: currentArray,
      });
    } else {
      setVideogame({
        ...videogame,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRightErrors(
      validate({
        ...videogame,
        [e.target.name]: e.target.value,
      })
    );
    if (
      ![
        videogame.name,
        videogame.description,
        videogame.released,
        videogame.rating,
        videogame.platforms,
        videogame.genres,
      ].every(Boolean)
    ) {
      return alert("You should fill all inputs require");
    }
    dispatch(createVideogame(videogame));
  };

  return (
    <div className={style.comp}>
      <div className={style.container}>
        <h1>Create a videogame</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Name:</label>
              <input
                className={style.inp}
                name="name"
                value={videogame.name}
                onChange={handleChange}
              />
              {rightErrors.name && (
                <span className={style.err}>{rightErrors.name} </span>
              )}
            </div>
            {
              ///////////////
            }{" "}
            <div>
              <label>Description:</label>
              <input
                className={style.inp}
                name="description"
                value={videogame.description}
                onChange={handleChange}
              />
              {rightErrors.description && (
                <span>{rightErrors.description} </span>
              )}
            </div>
            {
              ///////////////
            }{" "}
            <div>
              <label>Released:</label>
              <input
                className={style.inp}
                name="released"
                value={videogame.released}
                onChange={handleChange}
              />
              {rightErrors.released && <span>{rightErrors.released} </span>}
            </div>
            {
              ///////////////
            }
            <div>
              <label>Images:</label>
              <input
                type="file"
                id="file"
                accept="image/jpeg, image/png, image/jpg"
                className={style.inp}
                name="image"
                value={videogame.image}
                onChange={handleChange}
              />
              {/* {rightErrors.image && <span>{rightErrors.image} </span>} */}
            </div>
            {
              ///////////////
            }{" "}
            <div>
              <label>Rating:</label>
              <input
                className={style.inp}
                name="rating"
                value={videogame.rating}
                onChange={handleChange}
              />
              {rightErrors.rating && <span>{rightErrors.rating} </span>}
            </div>
            {
              ///////////////
            }{" "}
            <div>
              <label>Platforms:</label>

              <input
                className={style.inp}
                name="platforms"
                value={videogame.platforms}
                onChange={handleChange}
              />
              {rightErrors.platforms && <span>{rightErrors.platforms} </span>}
            </div>
            <div>
              <label>Genres:</label>
              {
                <select
                  className={style.inp}
                  name="genres"
                  value={videogame.genres}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Selecciona una opción
                  </option>

                  {estadoGenres.map((e) => (
                    <option key={e.name}>{e.name} </option>
                  ))}
                </select>
              }
              {rightErrors.genres && <span>{rightErrors.genres} </span>}
            </div>
            {videogame.genres.length > 0 && (
              <div className={style.gens}>
                {videogame.genres?.map((genre) => {
                  return (
                    <div className={style.gen}>
                      <p>{genre}</p>
                      <button
                        id={genre}
                        type="button"
                        onClick={() => deleteGenre(genre)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {
              ///////////////
            }{" "}
            <button
              type="submit"
              name="create"
              onChange={handleSubmit}
              disabled={
                !videogame.name ||
                !videogame.description ||
                !videogame.released ||
                !videogame.rating ||
                !videogame.platforms ||
                !videogame.genres
              }
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
