import { useEffect, useState } from "react";
import "./styles.css";
import {
  updateUser,
  deleteUser,
  getUserByIdSpecific,
  getUsers,
  createUserAdmin,
} from "../../api/user";

export default function UserManager() {
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updNome, setUpdNome] = useState("");
  const [updEmail, setUpdEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [newAdminNome, setNewAdminNome] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminSenha, setNewAdminSenha] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await getUserByIdSpecific(userId);
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
      fetchAllUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Houve um erro ao tentar deletar o usuário.");
    }
  };

  const handleCreateAdmin = async () => {
    if (!newAdminNome || !newAdminEmail || !newAdminSenha) {
      alert("Por favor, preencha todos os campos para criar um usuário administrador.");
      return;
    }
    try {
      const response = await createUserAdmin({
        nome: newAdminNome,
        email: newAdminEmail,
        senha: newAdminSenha,
      });
      alert(`Usuário administrador ${response.nome} criado com sucesso!`);
      setNewAdminNome("");
      setNewAdminEmail("");
      setNewAdminSenha("");
      fetchAllUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao criar usuário administrador:", error);
      alert("Houve um erro ao tentar criar o usuário administrador.");
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

      <div className="user-create-card">
        <h2>Criar Novo Usuário Administrador</h2>
        <input
          type="text"
          placeholder="Nome do Administrador"
          value={newAdminNome}
          onChange={(e) => setNewAdminNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email do Administrador"
          value={newAdminEmail}
          onChange={(e) => setNewAdminEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha do Administrador"
          value={newAdminSenha}
          onChange={(e) => setNewAdminSenha(e.target.value)}
        />
        <button onClick={handleCreateAdmin}>Criar Usuário Admin</button>
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
