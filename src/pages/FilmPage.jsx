import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilmById } from "../features/films/filmSlice";
import './FilmPage.css';

export default function FilmPage() {
  const { filmId } = useParams();
  const dispatch = useDispatch();
  const { details, status } = useSelector((state) => state.film);

  useEffect(() => {
    dispatch(fetchFilmById(filmId));
  }, [dispatch, filmId]);

  if (status === "loading") return <p>Loading...</p>;
  if (!details) return <p>No data available</p>;

  return (
    <div className="container">
      <h2 className="title">{details.title}</h2>
      <p className="info"><strong>Director:</strong> {details.director}</p>
      <p className="info"><strong>Producer:</strong> {details.producer}</p>
      <p className="info"><strong>Release Date:</strong> {details.release_date}</p>
      <p className="crawl"><strong>Opening Crawl:</strong> {details.opening_crawl}</p>

      <h3 className="subtitle">Characters</h3>
      <ul className="character-list">
        {details.characters?.map((url) => {
          const id = url.split("/").pop(); // отримати id з URL
          return (
            <li key={id}>
              <Link to={`/characters/${id}`} className="character-link">
                Character {id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
