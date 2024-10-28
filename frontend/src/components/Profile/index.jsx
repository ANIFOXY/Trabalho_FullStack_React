import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/Context';
import { getUserById, updateUser, deleteUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updNome, setUpdNome] = useState('');
    const [updEmail, setUpdEmail] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserById(user.id);
                setUserData(response);
                setUpdNome(response.nome);
                setUpdEmail(response.email);
            } catch (error) {
                setErrorMessage('Erro inesperado, tente novamente mais tarde!');
            }
        };

        fetchUserData();
    }, [user.id]);

    const handleSaveUpdate = async () => {
        try {
            const response = await updateUser(user.id, { nome: updNome, email: updEmail });
            if (response) {
                setUserData(prevData => ({ ...prevData, nome: updNome, email: updEmail }));
                setIsUpdate(false);
            }
        } catch (error) {
            setErrorMessage('Erro inesperado, tente novamente mais tarde!');
        }
    };

    const handleClickUpdate = () => {
        setIsUpdate(true);
    };

    const handleClickDelete = async () => {
        try {
            const response = prompt("Para confirmar exclusão digite seu email:");
            if (response === userData.email) {
                await deleteUser(user.id);
                logout();
                navigate('/');
            } else {
                setErrorMessage("Email inválido, processo cancelado.");
            }
        } catch (error) {
            setErrorMessage('Erro inesperado, tente novamente mais tarde!');
        }
    };

    if (errorMessage) {
        return (
            <div className='profile-error'>
                <p>{errorMessage}</p>
            </div>
        );
    }

    if (!userData) {
        return <div className='profile-loading'>Carregando...</div>; 
    }

    return (
        <div className='profile-container'>
            <div className='profile-info'>
                <h1 className='profile-title'>Dados do seu perfil</h1>
                <p>Nome: {!isUpdate ? userData.nome : <input className='profile-input' type='text' value={updNome} onChange={(e) => setUpdNome(e.target.value)} />} </p>
                <p>Email: {!isUpdate ? userData.email : <input className='profile-input' type='email' value={updEmail} onChange={(e) => setUpdEmail(e.target.value)} />} </p>
                {
                    !isUpdate ? 
                    <div className='profile-actions'>
                        <button className='profile-delete-button' onClick={handleClickDelete}>Excluir Conta</button>
                        <button className='profile-primary-button' onClick={handleClickUpdate}>Alterar Dados</button>
                    </div>
                    : 
                    <div className='profile-actions'>
                        <button className='profile-cancel-button' onClick={() => setIsUpdate(false)}>Cancelar</button>
                        <button className='profile-primary-button' onClick={handleSaveUpdate}>Salvar</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;
