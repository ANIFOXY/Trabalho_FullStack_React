import "./styles.css";
import List from "../../components/List";
import Videos from "../../components/Video";
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
