import { Link } from "react-router-dom"
import * as userService from '../../Utilities/users-service';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar ({ user, setUser }) {
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
      }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ff9800' }}>
        <Toolbar>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
            <HomeIcon sx={{ marginRight: '5px' }} />
            <Typography variant="h5">
              DogsJourney
            </Typography>
          </Link>
          <Link to="/memory" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            MyMemory
          </Link>
          <Link to="/dogprofiles" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            Profiles
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h7" style={{ margin: '0 10px' }}>Welcome back, {user.name}!</Typography>
          <Link to="/" onClick={handleLogOut} style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>
            Log Out
          </Link>
        </Toolbar>
      </AppBar>
    );
  }