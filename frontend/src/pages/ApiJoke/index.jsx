import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../../auth/Context'; 
import './styles.css';
import { getJokes } from '../../api/joke';


export default function JokePage() {
  const { role } = useContext(AuthContext); // para obter o role do usuario
  const [currentJoke, setCurrentJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('Any');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('');

  async function fetchJokes(type, language, category) {
    try {
      const data = await getJokes(type, language, category)
      console.log(Math.floor(Math.random() * data.length))

      return data[Math.floor(Math.random() * data.length)];
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  async function loadJoke(type, language, category) {
    setLoading(true);
    const data = await fetchJokes(type, language, category);
    if (data) {
      setCurrentJoke(data.jokes ? data.jokes[0] : data);
    }
    setLoading(false);
  }

  async function getNewJoke() {
    setLoading(true);
    const data = await fetchJokes(selectedType, selectedLanguage, selectedCategory);
    if (data) {
      setCurrentJoke(data.jokes ? data.jokes[0] : data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadJoke(selectedType, selectedLanguage, selectedCategory);
  }, [selectedType, selectedLanguage, selectedCategory]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading && !currentJoke) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className='joke-page'>
      <div className="filter">
        <label htmlFor="joke-type">Escolha o tipo de piada: </label>
        <select id="joke-type" value={selectedType} onChange={handleTypeChange}>
          <option value="Any">Qualquer</option>
          <option value="Programming">Programação</option>
          <option value="Miscellaneous">Diversos</option>
          <option value="Dark">Escuro</option>
          <option value="Spooky">Assustador</option>
          <option value="Christmas">Natalino</option>
          <option value="Pun">Trocadilhos</option>
        </select>
      </div>

      <div className="filter">
        <label htmlFor="joke-language">Escolha o idioma: </label>
        <select id="joke-language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
          <option value="pt">Português</option>
          <option value="de">Alemão</option>
          <option value="fr">Francês</option>
          <option value="it">Italiano</option>
        </select>
      </div>

      <div className="filter">
        <label htmlFor="joke-category">Escolha a categoria: </label>
        <select id="joke-category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Nenhum</option>
          <option value="nsfw">NSFW</option>
          <option value="religious">Religioso</option>
          <option value="political">Político</option>
          <option value="racist">Racista</option>
          <option value="sexist">Sexista</option>
          <option value="explicit">Explícito</option>
        </select>
      </div>

      <div className='joke-list'>
        {currentJoke ? (
          <div className='joke-card'>
            {currentJoke.type === 'single' ? (
              <p>{currentJoke.joke}</p>
            ) : (
              <>
                <p><strong>Setup:</strong> {currentJoke.setup}</p>
                <p><strong>Delivery:</strong> {currentJoke.delivery}</p>
              </>
            )}
          </div>
        ) : <p>Nenhuma piada encontrada.</p>}
      </div>
      
      <button onClick={getNewJoke} className='new-joke-button'>
        Outra piada
      </button>

      {role === 'admin' && (
        <Link to="/manageJoke" className="admin-link">
          MANAGER
        </Link>
      )}
    </div>
  );
}
