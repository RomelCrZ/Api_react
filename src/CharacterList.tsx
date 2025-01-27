import React from "react";


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharacterListProps {
  characters: Character[];
  onSelect: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelect }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div
          key={character.id}
          className="character-item"
          onClick={() => onSelect(character)}
        >
          <img src={character.image} alt={character.name} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
