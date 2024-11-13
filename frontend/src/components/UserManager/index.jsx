import { useEffect, useState } from "react";
import "./styles.css";
import {
  updateUser,
  deleteUser,
  getUserByIdSpecific,
  getUsers,
} from "../../api/user";

export default function UserManager() {
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updNome, setUpdNome] = useState("");
  const [updEmail, setUpdEmail] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await getUserByIdSpecific(userId);
        console.log(userId);
        setUserData(response);
        setUpdNome(response.nome);
        setUpdEmail(response.email);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Usuário não encontrado ou erro ao buscar dados.");
      }
    } else {
      alert("Por favor, insira um ID de usuário válido.");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
    }
  };

  const handleSaveUpdate = async () => {
    const response = await updateUser(userId, {
      nome: updNome,
      email: updEmail,
    });
    if (response) {
      setUserData((prevData) => ({
        ...prevData,
        nome: updNome,
        email: updEmail,
      }));
      setIsUpdate(false);
    }
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteUser(userId);
      alert("Usuário deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Houve um erro ao tentar deletar o usuário.");
    }
  };

  return (
    <div className="profile-container">
      <h1>Gerenciamento de Usuário</h1>

      <div className="user-card">
        <h2>Buscar Usuário por ID</h2>
        <input
          type="text"
          placeholder="Digite o ID do usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchUserData}>Buscar Usuário</button>

        {userData && (
          <>
            <div className="profile-buttons">
              {isUpdate ? (
                <>
                  <input
                    type="text"
                    placeholder="Nome:"
                    value={updNome}
                    onChange={(e) => setUpdNome(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Email:"
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

      <div className="user-list-card">
        <h2>Lista de Todos os Usuários</h2>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-list-item">
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Nome:</strong> {user.nome}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
