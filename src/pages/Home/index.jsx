import "./styles.css";
import List from "../../components/List";
import Forms from "../../components/Forms";

export default function Home() {
  return (
    <main>
      <List titulo="Minha tela exemplo" />
      <Videos />
      <Forms />
    </main>
  );
}
