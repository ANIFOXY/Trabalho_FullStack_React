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
                    <li>About</li>
                </Link>

                <Link to="/categories">
                    <li>Categories</li>
                </Link>

                <Link to="/flags">
                    <li>Flags</li>
                </Link>

                <Link to="/idioma">
                    <li>idioma</li>
                </Link>

                <Link to="/chave">
                    <li>Palavra-Chave</li>
                </Link>
            </ul>
        </nav>
        </header>
    )
}