import React, { useState } from 'react';
import "./styles.css";

const Cadastro = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
  
        console.log('Nome:', name);
        console.log('Email:', email);
        console.log('Senha:', password);
        console.log('CPF:', cpf);
        console.log('Telefone:', phone);
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
                        value={name}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastro-input-group">
                    <label htmlFor="cpf" className="cadastro-label">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        className="cadastro-input"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastro-input-group">
                    <label htmlFor="phone" className="cadastro-label">Telefone:</label>
                    <input
                        type="text"
                        id="phone"
                        className="cadastro-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
