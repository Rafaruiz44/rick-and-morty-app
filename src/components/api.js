import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/character?page=${page}`);
  return response.data;
};
