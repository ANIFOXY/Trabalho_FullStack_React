import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { createJoke, updateJoke, deleteJoke, getJokeById } from '../../api/joke'; 

export default function JokeManager() {
  const navigate = useNavigate();
  const [jokeData, setJokeData] = useState({
    id: '',
    category: '',
    type: 'single',
    joke: '',
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
    safe: true,
    lang: 'en',
  });
  
  const [jokeIdToEdit, setJokeIdToEdit] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setJokeData({
      ...jokeData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddSave = async () => {
    try {
      const { joke, category } = jokeData;
      if (!joke || !category) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      if (isUpdate) {
        console.log("Updating joke with ID:", jokeData.id); 
        await updateJoke(jokeData.id, jokeData);
      } else {
        console.log("Creating new joke"); 
        await createJoke(jokeData);
      }
      navigate('/apiJoke');
    } catch (error) {
      console.error("Error saving joke:", error); 
      alert('Erro ao salvar a piada. Tente novamente. ' + error.message); 
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar esta piada?');
    if (confirmDelete) {
      try {
        await deleteJoke(jokeIdToEdit);
        navigate('/apiJoke');
      } catch (error) {
        console.error("Error deleting joke:", error);
        alert('Erro ao deletar a piada. ' + error.message);
      }
    }
  };

  const fetchJoke = async () => {
    if (jokeIdToEdit) {
      try {
        const joke = await getJokeById(jokeIdToEdit);
        console.log("Fetched joke:", joke); 
        setJokeData(joke);
        setIsUpdate(true);
      } catch (error) {
        console.error("Error fetching joke:", error);
        alert('Erro ao buscar a piada. ' + error.message); 
      }
    }
  };

  useEffect(() => {
    if (jokeIdToEdit) {
      fetchJoke();
    } else {
      setIsUpdate(false);
      setJokeData({
        id: '',
        category: '',
        type: 'single',
        joke: '',
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
        safe: true,
        lang: 'en',
      });
    }
  }, [jokeIdToEdit]);

  return (
    <div className='joke-manager'>
      <div className='card'>
        <h2>Adicionar Nova Piada</h2>
        <input
          type="text"
          id='joke'
          placeholder='Conteúdo da piada'
          value={jokeData.joke}
          onChange={handleChange}
          required
        />
        {jokeData.type === 'twopart' && (
          <>
            <input
              type="text"
              id='setup'
              placeholder='Setup'
              value={jokeData.setup}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id='delivery'
              placeholder='Delivery'
              value={jokeData.delivery}
              onChange={handleChange}
              required
            />
          </>
        )}
        <select id='category' value={jokeData.category} onChange={handleChange} required>
          <option value="">Selecione uma categoria</option>
          <option value="nsfw">NSFW</option>
          <option value="religious">Religioso</option>
          <option value="political">Político</option>
          <option value="racist">Racista</option>
          <option value="sexist">Sexista</option>
          <option value="explicit">Explícito</option>
        </select>
        <select id='lang' value={jokeData.lang} onChange={handleChange}>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
          <option value="pt">Português</option>
          <option value="de">Alemão</option>
          <option value="fr">Francês</option>
          <option value="it">Italiano</option>
        </select>

        <div>
          <label>
            <input type="checkbox" id='nsfw' checked={jokeData.nsfw} onChange={handleChange} />
            NSFW
          </label>
          <label>
            <input type="checkbox" id='religious' checked={jokeData.religious} onChange={handleChange} />
            Religioso
          </label>
          <label>
            <input type="checkbox" id='political' checked={jokeData.political} onChange={handleChange} />
            Político
          </label>
          <label>
            <input type="checkbox" id='racist' checked={jokeData.racist} onChange={handleChange} />
            Racista
          </label>
          <label>
            <input type="checkbox" id='sexist' checked={jokeData.sexist} onChange={handleChange} />
            Sexista
          </label>
          <label>
            <input type="checkbox" id='explicit' checked={jokeData.explicit} onChange={handleChange} />
            Explícito
          </label>
          <label>
            <input type="checkbox" id='safe' checked={jokeData.safe} onChange={handleChange} />
            Seguro
          </label>
        </div>
        <button onClick={handleAddSave}>
          {isUpdate ? 'Alterar Piada' : 'Adicionar Piada'}
        </button>
      </div>

      <div className='card'>
        <h2>Editar ou Deletar Piada</h2>
        <input
          type="text"
          placeholder='ID da Piada'
          value={jokeIdToEdit}
          onChange={(e) => setJokeIdToEdit(e.target.value)}
        />
        <button onClick={fetchJoke}>Buscar Piada</button>
        {isUpdate && (
          <>
            <p>Conteúdo: {jokeData.joke}</p>
            <button onClick={handleDelete}>Deletar Piada</button>
          </>
        )}
      </div>
    </div>
  );
}
