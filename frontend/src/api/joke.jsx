import api from './api'; 

//Colocar mais parametros aqui para ele pegar do backend
//Os parametros estao no JoeManager
// obter todas as piadas
export const getJokes = async () => {
  const response = await api.get('/api/joke');
  return response.data;
};

// obter uma piada por id
export const getJokeById = async (id) => {
  const response = await api.get(`/api/joke/${id}`);
  return response.data;
};

// criar nova piada
export const createJoke = async (joke) => {
  const response = await api.post('/api/joke', joke);
  return response.data;
};

// atualizar piada
export const updateJoke = async (id, joke) => {
  const response = await api.put(`/api/joke/${id}`, joke);
  return response.data;
};

// deletar piada
export const deleteJoke = async (id) => {
  return api.delete(`/api/joke/${id}`);
};

