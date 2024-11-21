import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
};

export default CharacterList;
