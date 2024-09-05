import "./styles.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>Sobre a API de Piadas</h1>
      <p>
        Neste site, utilizamos a{" "}
        <a href="https://jokeapi.dev" target="_blank" rel="noopener noreferrer">
          JokeAPI
        </a>{" "}
        para fornecer uma variedade de piadas para nossos usuários. A JokeAPI é
        uma API de piadas que oferece uma ampla gama de piadas em diferentes
        categorias e formatos.
      </p>
      <div className="categorias-container">
        <h1>Categorias</h1>
        <p>Programação, Variadas, Dark, Trocadilho, Assustadora e Natal</p>
        <div className="linaguagens-container">
          <h1>Linguagens</h1>
          <p>Tcheco, Alemão, Inglês, Espanhol, Francês e Português.</p>
        </div>
      </div>
    </div>
  );
}
