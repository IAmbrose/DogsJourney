import { Link } from "react-router-dom"
import * as userService from '../../Utilities/users-service';

export default function NavBar ({ user, setUser }) {
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
      }
    return (
        <nav>
            <Link to="/">MainPage</Link>
            <Link to="/memory">MemoryPage</Link>
            <Link to="/dogprofiles">Dog Profiles Page</Link>
            <Link to="/upload">Upload</Link>
            <p>Welcome, {user.name}</p>
            <Link to="" onClick={handleLogOut}>
            Log Out
            </Link>
        </nav>
    )
}