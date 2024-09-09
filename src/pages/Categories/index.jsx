import { useEffect, useState } from 'react';
import './styles.css';

export default function CategoryJokePage() {
    const [category, setCategory] = useState('Programming');
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function carregarPiadaPorCategoria(categoria) {
        setLoading(true);
        try {
            const response = await fetch(`https://v2.jokeapi.dev/joke/${categoria}`);
            
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            
            const data = await response.json();
            setJoke(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarPiadaPorCategoria(category);
    }, [category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className='joke-container'>
            <h1>Piada por Categoria</h1>
            <select value={category} onChange={handleCategoryChange}>
                <option value="Programming">Programação</option>
                <option value="Miscellaneous">Diversos</option>
                <option value="Christmas">Natal</option>
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
        </div>
    );
}
