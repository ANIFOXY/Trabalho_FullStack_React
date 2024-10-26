import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Importando o ícone de usuário
import './styles.css';

export default function Header() {
    return (
        <header className="header">
            <h1 className="header-title">API de Piadas</h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/favorites" className="nav-link">Favoritos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ApiJoke" className="nav-link">Piadas(API)</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categories" className="nav-link">Categorias</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">Sobre</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link button-login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
                            <FaUser size={20} />Perfil
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
