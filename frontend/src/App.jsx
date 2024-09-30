import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import ApiJoke from "./pages/ApiJoke";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites.jsx";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/ApiJoke' element={<ApiJoke />}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/favorites' element ={<Favorites />}/>
        <Route path='/login' element ={<Login />}/>
        <Route path='/cadastro' element ={<Cadastro />}/>
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;