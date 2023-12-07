import {Outlet,Navigate} from "react-router-dom"

const ProtectedRoute = ({token}:any) => {
  if(token){
    return <Outlet />
  }
  else <Navigate to={"/login"} />
}
export default ProtectedRoute