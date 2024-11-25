import React from 'react';
import { motion } from 'framer-motion';

const CharacterCard = ({ character }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      
    >
      <img 
        src={character.image} 
        alt={character.name} 
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <div style={{ padding: '10px' }}>
        <h3>{character.name}</h3>
        <p><strong>-Species:</strong> {character.species}</p>
        <p><strong>-Status:</strong> {character.status}</p>
        <p><strong>-Gender:</strong> {character.gender}</p>
        <p><strong>-Origin:</strong> {character.origin.name}</p>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
