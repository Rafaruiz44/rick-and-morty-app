import React, { useEffect, useState } from 'react';
import { fetchCharacters } from './components/api';
import CharacterCard from './components/CharacterCard';
import { Link } from 'react-router-dom';
import Loader from './components/Loader';
import './Home.css';

const Home = () => {
  const [allCharacters, setAllCharacters] = useState([]); // Todos los personajes cargados
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtros aplicados
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ species: '', gender: '', status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // "grid" o "list"
  const [inputPage, setInputPage] = useState(''); // Estado temporal para el input

  const charactersPerPage = 20; // Cantidad de personajes por página

  // Carga inicial de todos los personajes
  useEffect(() => {
    const getAllCharacters = async () => {
      setLoading(true);
      let allData = [];
      let page = 1;
      let data;

      do {
        data = await fetchCharacters(page);
        allData = [...allData, ...data.results];
        page++;
      } while (data.info.next); // Itera hasta que no haya mas páginas

      setAllCharacters(allData);
      setFilteredCharacters(allData); // Inicialmente no hay filtros
      setTotalPages(Math.ceil(allData.length / charactersPerPage)); // Calcula el total de páginas
      setLoading(false);
    };

    getAllCharacters();
  }, []);

  // Filtra los personajes en base a los filtros y búsqueda
  useEffect(() => {
    let filteredData = allCharacters;

    if (searchTerm) {
      filteredData = filteredData.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.species) {
      filteredData = filteredData.filter((char) => char.species === filters.species);
    }

    if (filters.gender) {
      filteredData = filteredData.filter((char) => char.gender === filters.gender);
    }

    if (filters.status) {
      filteredData = filteredData.filter((char) => char.status === filters.status);
    }

    setFilteredCharacters(filteredData);
    setTotalPages(Math.ceil(filteredData.length / charactersPerPage)); // Actualiza las páginas según los resultados
    setCurrentPage(1); // Resetea a la primera pagina al aplicar filtros
  }, [searchTerm, filters, allCharacters]);

  // Actualiza el valor del input al cambiar la pagina
  useEffect(() => {
    setInputPage(String(currentPage));
  }, [currentPage]);

  // Manejadores de navegación
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <Loader />;

  // Determina los personajes a mostrar segun la página actual
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const charactersToShow = filteredCharacters.slice(startIndex, endIndex);

  return (
    <div>
      {/* Encabezado */}
      <header className="header">
        <h1>Rick and Morty App</h1>
      </header>

      {/* Botón de cambio de vista */}
      <div className="view-toggle">
        <button
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </button>
        <button
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => setViewMode('list')}
        >
          List View
        </button>
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filters.species}
          onChange={(e) => setFilters({ ...filters, species: e.target.value })}
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
        </select>
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <button
          className="clear-filters-button"
          onClick={() => {
            setFilters({ species: '', gender: '', status: '' });
            setSearchTerm('');
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Vista en cuadrícula o lista */}
      <div
        className={viewMode === 'grid' ? 'grid-container' : 'list-container'}
      >
        {charactersToShow.map((char) =>
          viewMode === 'grid' ? (
            <Link key={char.id} to={`/character/${char.id}`} className="character-card">
              <CharacterCard character={char} />
            </Link>
          ) : (
            <Link key={char.id} to={`/character/${char.id}`} className="list-item">
              <img src={char.image} alt={char.name} />
              <div className="details">
                <h3>{char.name}</h3>
                <p><strong>Species:</strong> {char.species}</p>
                <p><strong>Status:</strong> {char.status}</p>
                <p><strong>Gender:</strong> {char.gender}</p>
              </div>
            </Link>
          )
        )}
      </div>

      {/* Paginacion */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <input
          type="text"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onBlur={() => {
            const value = Number(inputPage);
            if (value >= 1 && value <= totalPages) {
              setCurrentPage(value);
            } else {
              setInputPage(String(currentPage)); // resetea fuera de rango
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = Number(inputPage);
              if (value >= 1 && value <= totalPages) {
                setCurrentPage(value);
              } else {
                setInputPage(String(currentPage)); // Resetea si está fuera de rango
              }
            }
          }}
          style={{ width: '50px', textAlign: 'center' }}
        />
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  );
};

export default Home;
