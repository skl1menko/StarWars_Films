// src/features/characters/CharactersPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setPage } from '../features/characters/charactersSlice';
import { Link } from 'react-router'; // Убедитесь, что это не react-router-dom!
import './CharactersPage.css';
import characterImages from '../assets/characterImages';

const CharactersPage = () => {
    const dispatch = useDispatch();
    const { characters, status, currentPage } = useSelector((state) => state.characters);

    useEffect(() => {
        dispatch(fetchCharacters(currentPage));
    }, [dispatch, currentPage]);

    const handlePageClick = (page) => {
        dispatch(setPage(page));
    };



    const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="characters-container">
            <h1 className="characters-title">Star Wars Characters</h1>

            <div className="char-ctr">
                {status === 'loading' ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                        <div className="characterItem skeleton" key={idx}>
                            <div className="characters-info">
                                <div className="character-image skeleton-box"></div>
                                <p className="characters-name skeleton-text">Loading...</p>
                            </div>
                        </div>
                    ))
                ) : status === 'failed' ? (
                    <p>Error loading characters</p>
                ) : (
                    characters.map((character) => (
                        <div className="characterItem" key={character.uid}>
                            <Link to={`/characters/${character.uid}`} className="link">
                                <div className="characters-info">
                                    <img
                                        src={characterImages[character.name]}
                                        alt={character.name}
                                        className="character-image"
                                    />
                                    <p className="characters-name">{character.name}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Пагинация отображается всегда */}
            <div className="pagination">
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`page-button ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );

};

export default CharactersPage;
