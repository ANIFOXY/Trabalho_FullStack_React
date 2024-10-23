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
import CadastroPiada from "./pages/CadastroJoke";
import { AuthProvider } from "./auth/Context.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";


function App() {
  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/about' element={<About />}/>
          <Route path='/ApiJoke' element={<ApiJoke />}/>
          <Route path='/categories' element={<Categories />}/>
          <Route path='/favorites' element ={<Favorites />}/>
          <Route path='/cadastroPiada' element={<CadastroPiada/>}/>
        </Route>

        <Route path='/login' element ={<Login />}/>
        <Route path='/cadastro' element ={<Cadastro />}/>
      </Routes>
      
      <Footer />
    </AuthProvider>
  );
}

export default App;