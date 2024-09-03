import './styles.css'

export default function Card({ data: personagem }){
    return (
        <div className="card chair" key={personagem.id}>
            <img src={personagem.image} alt={personagem.name} />
            
            <h2>{personagem.name}</h2>
            
            <div className='char-info'>
                <span><b>Especie:</b> {personagem.species}</span>
                <span><b>Genero:</b> {personagem.gender}</span>
            </div>

            <div>
                <h5><b>Status:</b> {personagem.status}</h5>
            </div>

            
        </div>
    )
}