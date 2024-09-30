import React, { useState } from 'react';
import "./styles.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione a lógica de autenticação aqui
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

export default Login;
