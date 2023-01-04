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
  }, [dispatch]);

  const validate = (videogame) => {
    let rightErrors = {};
    if (!videogame.name.length) rightErrors.name = "Debe ingresar un name";
    if (!videogame.description.length)
      rightErrors.description = "Debe ingresar un description";
    if (!videogame.released.length)
      rightErrors.released = "Debe ingresar released";
    if (!videogame.rating.length) rightErrors.rating = "Debe indicar el rating";
    // if (!videogame.platforms.length)
    //   rightErrors.platforms = "Debe indicar el platforms";
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
    dispatch(createVideogame(videogame));
  };

  return (
    <>
      <div>
        <h1>Create a videogame</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Name:</label>
              <input
                name="name"
                value={videogame.name}
                onChange={handleChange}
              />
              {rightErrors.name && <span>{rightErrors.name} </span>}
            </div>
            {
              ///////////////
            }{" "}
            <div>
              <label>Description:</label>
              <input
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
              <label>Imagenes:</label>
              <input
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
              <label>Genres:</label>
              {
                <select
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
              <div style={{ color: "black" }}>
                {videogame.genres?.map((genre) => {
                  return (
                    <div>
                      <p>{genre}</p>
                      <button
                        id={genre}
                        type="button"
                        onClick={() => deleteGenre(genre)}
                      >
                        eliminar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {
              ///////////////
            }{" "}
            <div>
              <label>Platforms:</label>

              <input
                name="platforms"
                value={videogame.platforms}
                onChange={handleChange}
              />
              {/* {rightErrors.platforms && <span>{rightErrors.platforms} </span>} */}
            </div>
            <button type="submit" onChange={handleSubmit}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
  //   <div>
  //   <label>Nueva prueba de lista</label>
  //   <div className={style.multiselector}>
  //     <div className={style.selectfield}>
  //       <input
  //         type="text"
  //         name=""
  //         placeholder="Elegí"
  //         id=""
  //         className={style.inputselector}
  //       />
  //       <span className={style.triangle}>&#9660; </span>
  //       <div className={style.list}>
  //         <label for="item1" className={style.item1}>
  //           <input type="checkbox" id="item1" />
  //           item 1
  //         </label>
  //         <label for="item2" className={style.item2}>
  //           <input type="checkbox" id="item2" />
  //           item 2
  //         </label>
  //         <label for="item3" className={style.item3}>
  //           <input type="checkbox" id="ite31" />
  //           item 3
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}
