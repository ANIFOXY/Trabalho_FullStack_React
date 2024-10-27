import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../auth/Context';
import './styles.css';

export default function Header() {
    const { user } = useAuth();
    console.log('User:', user); // Debugging
    
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
