import { Link } from "react-router-dom"
import { useUser } from "../../contexts/UserContext"

const Dashboard = () => {
  const {user} = useUser()
  return (
    <div>
      HI 
      <Link to={`/user/${user.userId}`}>Visit profile</Link>
    </div>
  )
}

export default Dashboard