
import { useEffect, useState } from 'react';
import './styles.css';

export default function JokePage() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('Any');  
  const [selectedLanguage, setSelectedLanguage] = useState('en');  
  const [selectedCategory, setSelectedCategory] = useState('');  

  async function fetchJokes(type, language, category) {
    try {
      let url = `https://v2.jokeapi.dev/joke/${type}?lang=${language}`;
      if (category) {
        url += `&blacklistFlags=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadJokes(type, language, category) {
    setLoading(true);
    const data = await fetchJokes(type, language, category);
    if (data) {
      setJokes(data.jokes ? [data] : [data]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadJokes(selectedType, selectedLanguage, selectedCategory);
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

  if (loading) {
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
        <option value="Puns">Trocadilhos</option>
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
      {jokes.length > 0 ? jokes.map((joke, index) => (
        <div key={index} className='joke-card'>
          {joke.type === 'single' ? (
            <p>{joke.joke}</p>
          ) : (
            <>
              <p><strong>Questão:</strong> {joke.setup}</p>
              <p><strong>Resposta:</strong> {joke.delivery}</p>
            </>
          )}
        </div>
      )) : <p>Nenhuma piada encontrada.</p>}
    </div>
  </div>
);
}
