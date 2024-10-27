import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/Context';
import { getUserById, updateUser, deleteUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updNome, setUpdNome] = useState('');
    const [updEmail, setUpdEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.id) {
                const data = await getUserById(user.id);
                setUserData(data);
                setUpdNome(data.nome);
                setUpdEmail(data.email);
            } else {
                navigate('/login'); 
            }
        };

        fetchUserData();
    }, [user, navigate]);

    const handleSaveUpdate = async () => {
        try {
            const response = await updateUser(user.id, { nome: updNome, email: updEmail });
            if (response) {
                setUserData(prevData => ({ ...prevData, nome: updNome, email: updEmail }));
                setIsUpdate(false);
            }
        } catch (error) {
            toast('Erro inesperado, tente novamente mais tarde!');
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
                toast("Email inválido, processo cancelado.");
            }
        } catch (error) {
            toast('Erro inesperado, tente novamente mais tarde!');
        }
    };

    if (!userData) {
        return <div>Carregando...</div>; 
    }

    return (
        <div className='profile'>
            <div className='info'>
                <h1>Dados do seu perfil</h1>
                <p>Nome: {!isUpdate ? userData.nome : <input type='text' value={updNome} onChange={(e) => setUpdNome(e.target.value)} />} </p>
                <p>Email: {!isUpdate ? userData.email : <input type='email' value={updEmail} onChange={(e) => setUpdEmail(e.target.value)} />} </p>
                {
                    !isUpdate ? 
                    <div className='actions'>
                        <button onClick={handleClickDelete}>Excluir Conta</button>
                        <button className='primary' onClick={handleClickUpdate}>Alterar Dados</button>
                    </div>
                    : 
                    <div className='actions'>
                        <button onClick={() => setIsUpdate(false)}>Cancelar</button>
                        <button className='primary' onClick={handleSaveUpdate}>Salvar</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;
