import React, { useEffect, useState, useDeferredValue, useMemo } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm); 
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

  
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm, characters]);

  const styles = {
    appContainer: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "center" as const,
    },
    selectedCharacterCard: {
      margin: "20px 0",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
    },
    searchInput: {
      padding: "10px",
      fontSize: "16px",
      width: "100%",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.appContainer}>
      <h1>Rick & Morty Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      {selectedCharacter && (
        <div style={styles.selectedCharacterCard}>
          <h2>{selectedCharacter.name}</h2>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
        </div>
      )}
      <CharacterList characters={filteredCharacters} onSelect={handleCharacterSelect} />
    </div>
  );
};

export default App;
