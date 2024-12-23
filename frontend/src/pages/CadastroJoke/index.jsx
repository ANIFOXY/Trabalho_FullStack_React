import { useEffect, useState } from 'react';
import './styles.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createJoke, updateJoke, deleteJoke, getJokeById } from '../../api/joke'; 

export default function JokeForm() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [isUpdate, setIsUpdate] = useState(false);
  const [jokeData, setJokeData] = useState({
    id: '',
    category: '',
    type: 'single',
    joke: '',
    setup: '',
    delivery: '',
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
    safe: true,
    lang: 'en',
  });

  useEffect(() => {
    const fetchJoke = async () => {
      if (id) {
        setIsUpdate(true);
        try {
          const joke = await getJokeById(id);
          setJokeData(joke);
        } catch (error) {
          console.error("Error fetching joke:", error);
          alert('Erro ao buscar a piada.');
        }
      } else {
        setIsUpdate(false);
      }
    };

    fetchJoke();
  }, [id]); 

  const goBack = () => navigate('/jokes');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setJokeData({
      ...jokeData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddSave = async () => {
    try {
      if (isUpdate) {
        console.log("Updating joke with ID:", jokeData.id); 
        await updateJoke(jokeData.id, jokeData);
      } else {
        console.log("Creating new joke"); 
        await createJoke(jokeData);
      }
      navigate('/jokes');
    } catch (error) {
      console.error("Error saving joke:", error); 
      alert('Erro ao salvar a piada. Tente novamente.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar esta piada?');

    if (confirmDelete) {
      try {
        console.log("Deleting joke with ID:", jokeData.id); 
        await deleteJoke(jokeData.id);
        navigate('/jokes');
      } catch (error) {
        console.error("Error deleting joke:", error); 
        alert('Erro ao deletar a piada.');
      }
    }
  };

  return (
    <div className='joke-form'>
      <h1>
        {isUpdate ? 'Alterar' : 'Adicionar'} Piada 
        {isUpdate && (
          <button onClick={handleDelete}>Deletar</button>
        )}
      </h1>
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
      <div className='actions'>
        <button onClick={goBack}>Cancelar</button>
        <button className='primary' onClick={handleAddSave}>
          {isUpdate ? 'Alterar' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}
