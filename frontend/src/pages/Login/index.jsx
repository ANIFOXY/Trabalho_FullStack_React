import React, { useContext, useState } from 'react';
import "./styles.css";
import { loginUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/Context';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    const handleCreateAccount = () => {
        navigate('/signup')
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password)
            console.log(response)
            if(response.token) {
                login(response.token)
                navigate('/')
            }
        } catch (error) {
            return alert('deu ruim no login')
        }

        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="login-wrapper">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-group">
                    <label htmlFor="email" className="login-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-input-group">
                    <label htmlFor="password" className="login-label">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-submit-button">Entrar</button>
            </form>
            <p className="login-register-prompt">
                Ainda não tem login? <a href="/cadastro" className="login-register-link">Cadastre-se</a>
            </p>
        </div>
    );
};
