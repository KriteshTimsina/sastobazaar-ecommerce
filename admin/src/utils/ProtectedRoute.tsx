import {Outlet,Navigate} from "react-router-dom"
import { useUser } from "../contexts/UserContext"

const ProtectedRoute = () => {
  const {user} = useUser();

  if(user===null){
    return <Navigate to={"/login"} />
  }
  else return <Outlet />
}
export default ProtectedRoute