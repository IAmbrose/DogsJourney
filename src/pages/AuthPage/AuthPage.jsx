import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Grid, Button, Box } from "@mui/material";

export default function AuthPage ({ setUser }) {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    }
    return (
    <Grid container component="main" sx={{ height: '100vh'}}>
      <Grid 
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
        backgroundImage: 'url(https://imgur.com/5Xa1iiC.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showLoginForm ? (
            <>
              <LoginForm setUser={setUser} />
              <p>Don&apos;t have an account?
              <Button onClick={toggleForm} variant="text">
                Sign Up
              </Button>
              </p>
            </>
          ) : (
            <>
              <SignUpForm setUser={setUser} />
              <p>Already have an account?
              <Button onClick={toggleForm} variant="text">
                Login
              </Button>
              </p>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}