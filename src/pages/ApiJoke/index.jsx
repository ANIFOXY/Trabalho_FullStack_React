import { useEffect, useState } from 'react'
import './styles.css'
import Card from '../../components/Card'


export default function ApiRickAndMorty() {
    const [conteudo, setConteudo] = useState(<>Carregando</>)

    async function carregarTodosOsPersonagens(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        }

        const response = await fetch('https://rickandmortyapi.com/api/character', requestOptions)
        

        if(!response.ok){
            throw new Error("Erro na requisicao")
        }

        const data = await response.json()

        console.log(data)

        // carregar todos os personagens da API do rick and morty - com o fetch
        return { ...data }
    }

    async function listarPersonagens(){
        // const api = carregarTodosOsPersonagens()
        // // const result = api.result

        const { info, results } = await carregarTodosOsPersonagens()

        return results.map(personagem => <Card key={personagem.id} data={personagem} />)
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