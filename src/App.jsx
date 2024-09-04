import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import ApiJoke from "./pages/ApiJoke"
import Categories from "./pages/Categories"
import Favorites from "./pages/Categories"


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
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;