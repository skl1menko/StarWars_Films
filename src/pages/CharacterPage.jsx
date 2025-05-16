import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterById } from "../features/characters/characterSlice";
import './CharacterPage.css'

export default function CharacterPage() {
  const { charId } = useParams();
  const dispatch = useDispatch();
  const { details, status } = useSelector((state) => state.character);

  useEffect(() => {
    dispatch(fetchCharacterById(charId));
  }, [dispatch, charId]);

  if (status === "loading") return <p>Loading...</p>;
  if (!details) return <p>No character data</p>;

  return (
    <div className="container">
      <h2 className="title">{details.name}</h2>
      <p className="info"><strong>Gender:</strong> {details.gender}</p>
      <p className="info"><strong>Birth Year:</strong> {details.birth_year}</p>
      <p className="info"><strong>Height:</strong> {details.height} cm</p>
      <p className="info"><strong>Mass:</strong> {details.mass} kg</p>
    </div>
  );
}
