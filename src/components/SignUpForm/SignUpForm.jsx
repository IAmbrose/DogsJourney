import { Component } from "react";
import { signUp } from '../../Utilities/users-service';
import { TextField, Button, Container, Box, Typography } from '@mui/material';


export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
      };

      handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
        });
      };

      handleSubmit = async (evt) => {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            const user = await signUp(formData);
            this.props.setUser(user)
        } catch {
          // An error occurred
          this.setState({ error: "Sign Up Failed - Try Again" });
        }
      };

      render() {
        return (
          <Container maxWidth="md">
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 4,
              mt: 5,
            }}
          >
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
              <Box component="form" onSubmit={this.handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Confirm"
                  type="password"
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" fullWidth>
                  SIGN UP
                </Button>
              </Box>
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {this.state.error}
            </Typography>
          </Box>
        </Container>
      );
    }
  }