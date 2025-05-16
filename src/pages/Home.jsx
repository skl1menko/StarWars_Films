import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../features/films/filmsSlice";
import { Link } from "react-router"; // змінив на правильний імпорт для Link
import './Home.css';

const filmImages = {
    "A New Hope": "https://m.media-amazon.com/images/I/81CIXJxQ3TL._SY522_.jpg",
    "The Empire Strikes Back": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg/250px-The_Empire_Strikes_Back_%281980_film%29.jpg",
    "Return of the Jedi": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/ReturnOfTheJediPoster1983.jpg/250px-ReturnOfTheJediPoster1983.jpg",
    "The Phantom Menace": "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Star_Wars_Phantom_Menace_poster.jpg/250px-Star_Wars_Phantom_Menace_poster.jpg",
    "Attack of the Clones": "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg/250px-Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg",
    "Revenge of the Sith": "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg/250px-Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg",
};

export default function Home() {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.films);

    useEffect(() => {
        if (status === "idle") dispatch(fetchFilms());
    }, [dispatch, status]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error loading films</p>;

    return (
        <div className="home-container">
            <h1 className="home-title">Star Wars Films</h1>
            <div className="film-container">
                {items.map((film) => (
                    <div key={film.uid} className="filmItem">
                        <Link to={`/films/${film.uid}`} className="link">
                            <div className="film-info">
                                <img
                                    src={filmImages[film.properties.title] || "https://example.com/default-image.jpg"}
                                    alt={film.properties.title}
                                    className="film-image"
                                />
                                <div className="film-details">
                                    <p className="film-title">{film.properties.title}</p>
                                    <p className="film-director">{film.properties.director}</p>
                                    <p className="film-release">{film.properties.release_date}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
}
