import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/Context';
import './styles.css';

export default function Header() {
    const { user, logout } = useAuth(); // Obtém o usuário e a função logout do contexto de autenticação
    const navigate = useNavigate(); // Inicializa o hook useNavigate para redirecionamento

    const handleLogout = () => {
        logout(); // Chama a função logout do contexto
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <header className="header">
            <h1 className="header-title">API de Piadas</h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    {!user ? (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link button-login">Login</Link>
                        </li>
                    ) : (
                        <>
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
                                <Link to="/profile" className="nav-link">Perfil</Link>
                            </li>
                            <li className="logout-button">
                                <button onClick={handleLogout} className="nav-link button-logout">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
