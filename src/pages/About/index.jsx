import './styles.css'

export default function About() {
    return (
        <div className="about-container">
            <h1>Sobre a API de Piadas</h1>
            <p>
                Neste site, utilizamos a <a href="https://jokeapi.dev" target="_blank" rel="noopener noreferrer">JokeAPI</a> para fornecer uma variedade de piadas para nossos usuários.
                A JokeAPI é uma API de piadas que oferece uma ampla gama de piadas em diferentes categorias e formatos. Abaixo, você encontrará uma descrição das principais funções e opções disponíveis na API.
            </p>
            <h2>Funções da API</h2>
            <ul>
                <li>
                    <strong>Categories:</strong> A API suporta várias categorias de piadas, como:
                    <ul>
                        <li><strong>Programming:</strong> Piadas relacionadas a programação.</li>
                        <li><strong>Miscellaneous:</strong> Piadas diversas que não se encaixam em outras categorias.</li>
                        <li><strong>Dark:</strong> Piadas com um tom mais sombrio.</li>
                        <li><strong>Spooky:</strong> Piadas temáticas de Halloween.</li>
                    </ul>
                </li>
                <li>
                    <strong>Types:</strong> Você pode escolher entre diferentes tipos de piadas, como:
                    <ul>
                        <li><strong>Single:</strong> Uma piada única em um único texto.</li>
                        <li><strong>Twopart:</strong> Uma piada que é dividida em duas partes, com um setup e punchline.</li>
                    </ul>
                </li>
                <li>
                    <strong>Language:</strong> A API suporta vários idiomas para as piadas, incluindo inglês e outros idiomas suportados.
                </li>
                <li>
                    <strong>Safe Mode:</strong> A API oferece um modo seguro para filtrar piadas que possam ser consideradas ofensivas.
                </li>
            </ul>
            <p>
                Para mais detalhes sobre como usar a API e acessar as diferentes categorias e opções, visite a <a href="https://jokeapi.dev" target="_blank" rel="noopener noreferrer">documentação oficial da JokeAPI</a>.
            </p>
        </div>
    )
}