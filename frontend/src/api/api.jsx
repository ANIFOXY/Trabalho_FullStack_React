import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000
})

// funcao para pegar o token do storage
// e enviar em cada uma das requisicoes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = token
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api