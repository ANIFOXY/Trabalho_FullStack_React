import api from './api'

export const createUserAdmin = async (user) => {
    console.log(user)
    const response = await api.post('/api/user/admin', user)
    console.log (response)
    return response.data
}

export const createUser = async (user) => {
    console.log(user)
    const response = await api.post('/api/user', user)
    console.log (response)
    return response.data
}

export const updateUser = async (id, user) => {
    const response = await api.put(`/api/user/${id}`, user)
    return response.data
}
export const deleteUser = async (id) => {
    return api.delete(`/api/user/${id}`)
}
export const getUserById = async (id) => {
    const response = await api.get(`/api/user/${id}`)
    return response.data
}
export const getUsers = async () => {
    const response = await api.get(`/api/user/`)
    return response.data
}
export const loginUser = async (email, senha) => {
    const body = { email, senha }
    const response = await api.post(`/api/login`, body)
    return response.data
}