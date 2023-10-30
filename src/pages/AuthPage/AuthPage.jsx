import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Grid, Button } from "@mui/material";

export default function AuthPage ({ setUser }) {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    }
    return (
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <h1>DogsJourney</h1>
      </Grid>
      <Grid item>
        {showLoginForm ? (
          <>
            <LoginForm setUser={setUser} />
            <Button onClick={toggleForm} variant="text">
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <SignUpForm setUser={setUser} />
            <Button onClick={toggleForm} variant="text">
              Login
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}