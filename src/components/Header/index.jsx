import { Link } from 'react-router-dom'
import './styles.css'

export default function Header() {
    return(
        <header id="cabecalho">
        <h1>Minha Página HTML - básico</h1>
        <nav>
            <ul>
                <Link to="/home">
                    <li>Home</li>
                </Link>

                <Link to="/about">
                    <li>Sobre</li>
                </Link>

                <Link to="/categories">
                    <li>Categorias</li>
                </Link>

                <Link to="/ApiJoke">
                    <li>Piadas</li>
                </Link>

                <Link to="/favorites">
                    <li>Favoritos</li>
                </Link>

            </ul>
        </nav>
        </header>
    )
}