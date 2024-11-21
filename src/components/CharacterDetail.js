import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
      setLoading(false);
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        Back to List
      </button>
      <div style={styles.card}>
        <div style={styles.details}>
          <h1 style={styles.name}>{character.name}</h1>
          {/* Imagen ubicada después del nombre */}
          <img src={character.image} alt={character.name} style={styles.image} />
          <p style={styles.info}><strong>Species:</strong> {character.species}</p>
          <p style={styles.info}><strong>Status:</strong> {character.status}</p>
          <p style={styles.info}><strong>Gender:</strong> {character.gender}</p>
          <p style={styles.info}><strong>Origin:</strong> {character.origin.name}</p>
          <h2 style={styles.episodesTitle}>Episodes</h2>
          <ul style={styles.episodesList}>
            {character.episode.map((ep, index) => (
              <li key={index} style={styles.episodeItem}>{ep}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1e1e2e', // Fondo acorde a Home
    color: '#fff', // Texto blanco
    minHeight: '100vh',
  },
  backButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2a2d3e', // Fondo similar a las tarjetas en Home
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    width: '80%',
    maxWidth: '1000px',
    padding: '20px',
    alignItems: 'center',
  },
  image: {
    width: '300px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
    marginTop: '20px',
    marginBottom: '20px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff', // Texto blanco
    marginBottom: '10px',
  },
  info: {
    fontSize: '18px',
    color: '#bfbfbf', // Texto gris claro
    marginBottom: '8px',
  },
  episodesTitle: {
    fontSize: '24px',
    color: '#fff', // Título blanco
    marginTop: '20px',
  },
  episodesList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    textAlign: 'center',
  },
  episodeItem: {
    fontSize: '16px',
    color: '#bfbfbf', // Texto gris claro
    marginBottom: '6px',
    wordWrap: 'break-word',
  },
};

// Efecto hover para el botón
styles.backButton[':hover'] = {
  backgroundColor: '#3e8e41', // Verde más oscuro al hacer hover
};


export default CharacterDetail;
