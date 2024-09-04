import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Flags from "./pages/Flags"
import Idioma from "./pages/Idioma"
import Chave from "./pages/Chave"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/ApiJoke' element={<ApiRickAndMorty />}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/flags' element={<Flags />}/>
        <Route path='/idioma' element={<Idioma />}/>
        <Route path='/chave' element={<Chave />}/>
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;