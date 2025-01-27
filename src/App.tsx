import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterList from "./CharacterList";


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(() => {
    const savedCharacter = localStorage.getItem("selectedCharacter");
    return savedCharacter ? JSON.parse(savedCharacter) : null;
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get<{ results: Character[] }>(
          "https://rickandmortyapi.com/api/character"
        );
        setCharacters(response.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    localStorage.setItem("selectedCharacter", JSON.stringify(character));
  };

  return (
    <div className="app-container">
      <h1>Rick & Morty Characters</h1>
      {selectedCharacter && (
        <div className="selected-character-card">
          <h2>{selectedCharacter.name}</h2>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
        </div>
      )}
      <CharacterList characters={characters} onSelect={handleCharacterSelect} />
    </div>
  );
};

export default App;
