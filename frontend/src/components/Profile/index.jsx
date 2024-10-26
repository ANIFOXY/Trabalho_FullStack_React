import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/Context';
import { getUserById } from '../../api/user';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.id) {
                const data = await getUserById(user.id);
                setUserData(data);
            } else {
                navigate('/login'); 
            }
        };

        fetchUserData();
    }, [user, navigate]);

    if (!userData) {
        return <div>Carregando...</div>; 
    }

    return (
        <div>
            <h1>Meu Perfil</h1>
            <p>Nome: {userData.nome}</p>
        </div>
    );
};

export default Profile;
