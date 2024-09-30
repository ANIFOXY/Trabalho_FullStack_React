import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import "./styles.css";

export default function Favorites() {
  const [joke, setJoke] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchJoke = async () => {
    setLoading(true); 
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=single'); 
      setJoke(response.data.joke); 
    } catch (err) {
      setError(err); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchJoke(); 
  }, []); 

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error.message}</p>; 

  return (
    <div className="piadas-card">
      <div className="card-h1">
        <h1>
          Nesta página, você irá encontrar a piada favorita de programação no momento!
        </h1>
      </div>
      <div className="piada-fav">
        <h2>Piada Favorita:</h2>
        <p>{joke}</p> 
        <button className="new-joke-button" onClick={fetchJoke}>Nova Piada</button>
      </div>
    </div>
  );
}
