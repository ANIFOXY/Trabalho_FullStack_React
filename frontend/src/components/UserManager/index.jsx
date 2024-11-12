import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser, getUserByIdSpecific } from '../../api/user';

export default function UserManager() {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [updNome, setUpdNome] = useState('');
    const [updEmail, setUpdEmail] = useState('');
    const navigate = useNavigate();

    const fetchUserData = async () => {
        if (userId) { 
            try {
                const response = await getUserByIdSpecific(userId);
                console.log(userId)
                setUserData(response);
                setUpdNome(response.nome);
                setUpdEmail(response.email);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                alert('Usuário não encontrado ou erro ao buscar dados.');
            }
        } else {
            alert('Por favor, insira um ID de usuário válido.');
        }
    };
    

    const handleSaveUpdate = async () => {
        const response = await updateUser(userId, { nome: updNome, email: updEmail });
        if (response) {
            setUserData(prevData => ({ ...prevData, nome: updNome, email: updEmail }));
            setIsUpdate(false);
        }
    };

    const handleClickUpdate = () => {
        setIsUpdate(true);
    };

    const handleClickDelete = async () => {
        const confirmation = prompt("Para confirmar exclusão digite o email do usuário:");
        if (confirmation === userData.email) {
            await deleteUser(userId);
            alert('Usuário deletado com sucesso.');
            navigate('/');
        } else {
            alert('Email incorreto. A exclusão foi cancelada.');
        }
    };

    return (
        <div className="profile-container">
            <h1>Gerenciamento de Usuário</h1>
            <div className="profile-content">
                <div>
                    <input
                        type="text"
                        placeholder="Digite o ID do usuário"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <button onClick={fetchUserData}>Buscar Usuário</button>
                </div>
                
                {userData && (
                    <>
                        <div>
                            <p>Nome: {userData.nome}</p>
                            <p>Email: {userData.email}</p>
                        </div>
                        <div className="profile-buttons">
                            {isUpdate ? (
                                <>
                                    <input
                                        type="text"
                                        value={updNome}
                                        onChange={(e) => setUpdNome(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={updEmail}
                                        onChange={(e) => setUpdEmail(e.target.value)}
                                    />
                                    <button onClick={handleSaveUpdate}>Salvar</button>
                                </>
                            ) : (
                                <button onClick={handleClickUpdate}>Editar</button>
                            )}
                            <button onClick={handleClickDelete}>Excluir</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
