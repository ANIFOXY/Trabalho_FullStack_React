import { useEffect, useState } from 'react';
import './styles.css';

export default function CategoryJokePage() {
    const [category, setCategory] = useState('Programming');
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchJokeByCategory(category) {
        setLoading(true);
        try {
            const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function loadJoke() {
        const data = await fetchJokeByCategory(category);
        if (data) {
            setJoke(data);
        }
    }

    async function getNewJoke() {
        const data = await fetchJokeByCategory(category);
        if (data) {
            setJoke(data);
        }
    }

    useEffect(() => {
        loadJoke();
    }, []);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    if (loading && !joke) {
        return <div className="loading">Carregando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className='joke-container'>
            <h1>Piada por Categoria</h1>
            <select value={category} onChange={handleCategoryChange}>
                <option value="Programming">Programação</option>
                <option value="Miscellaneous">Diversos</option>
                <option value="Dark">Escuro</option>
                <option value="Spooky">Assustador</option>
                <option value="Christmas">Natalino</option>
                <option value="Pun">Trocadilhos</option>
            </select>
            {joke && (
                <div>
                    {joke.type === 'single' ? (
                        <p>{joke.joke}</p>
                    ) : (
                        <>
                            <p>{joke.setup}</p>
                            <p>{joke.delivery}</p>
                        </>
                    )}
                </div>
            )}
            <button onClick={getNewJoke} className='new-joke-button'>
                Outra Piada
            </button>
        </div>
    );
}
