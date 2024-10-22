import React, { useState } from 'react';
import "./styles.css";
import { createUser } from '../../api/user.jsx';


const Cadastro = () => {
    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await createUser({  nome, email, senha })
        console.log(response)

        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Senha:', senha);
    };

    return (
        <div className="cadastro-wrapper">
            <h2 className="cadastro-title">Cadastro</h2>
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <div className="cadastro-input-group">
                    <label htmlFor="name" className="cadastro-label">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        className="cadastro-input"
                        value={nome}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastro-input-group">
                    <label htmlFor="email" className="cadastro-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="cadastro-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastro-input-group">
                    <label htmlFor="password" className="cadastro-label">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        className="cadastro-input"
                        value={senha}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cadastro-submit-button">Cadastrar</button>
            </form>
            <p className="cadastro-login-prompt">
                Já tem uma conta? <a href="/login" className="cadastro-login-link">Faça login</a>
            </p>
        </div>
    );
};

export default Cadastro;
