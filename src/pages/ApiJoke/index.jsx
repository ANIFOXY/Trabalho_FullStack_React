import { useEffect, useState } from 'react'
import './styles.css'
import Card from '../../components/Card'

const mock = {
    "error": false,
    "category": "Misc",
    "type": "twopart",
    "setup": "O que o pagodeiro foi fazer na igreja?",
    "delivery": "Cantar pá God.",
    "flags": {
        "nsfw": false,
        "religious": true,
        "political": false,
        "racist": false,
        "sexist": false,
        "explicit": false
    },
    "safe": false,
    "id": 1,
    "lang": "pt"
}

export default function ApiJoke() {
    const [conteudo, setConteudo] = useState(<>Carregando</>)

    async function carregarTodosOsPersonagens(){
        // carregar todos os personagens da API do rick and morty - com o fetch
        return mock
    }

    async function listarPersonagens(){
        const result = await carregarTodosOsPersonagens()

        return <>{result.setup}{ result.delivery}</>
    }

    useEffect(() => {
        async function getConteudo(){
            setConteudo(await listarPersonagens())
        }

        getConteudo()
    }, [])
    
    return (
        <div className='lista-principal'>
            { conteudo }
        </div>
    )
}