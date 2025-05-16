// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import FilmPage from "./pages/FilmPage";
import CharacterPage from "./pages/CharacterPage";
import CharactersPage from "./pages/CharactersPage";
import Header from './components/Header.jsx'
import './App.css';
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films/:filmId" element={<FilmPage />} />
        <Route path="/characters/:charId" element={<CharacterPage />} />
        <Route path="/characters" element={<CharactersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
