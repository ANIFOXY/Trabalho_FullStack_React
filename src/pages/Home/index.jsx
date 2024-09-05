import "./styles.css";
import { Link } from 'react-router-dom';
import List from "../../components/List";
import Forms from "../../components/Forms";
import FunnyImg from "../../assets/funny-bg.png"

export default function Home() {

  return (
    <div className="header-top">
        <h1>Você gosta de Piadas?</h1>
        <img src={FunnyImg} alt="logos"></img>
        <p>
            Aqui você irá ter acesso as melhores piadas, atualizadas em tempo real!
        </p>
        <Link to="/ApiJoke" className="Api-Joke"><button className="button-piadas">Acessar as Piadas</button></Link>
        
    </div>
)
}
