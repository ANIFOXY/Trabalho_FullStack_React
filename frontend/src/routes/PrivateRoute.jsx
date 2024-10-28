import { useContext } from "react";
import { AuthContext } from "../auth/Context";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    // pegar token
    const { token } = useContext(AuthContext)
console.log(token)
    // verificar se é null
    if(token === null) {
        return <Navigate to="/login" />
    }

    // redirecionar
    return <Outlet />
}

export default PrivateRoute;