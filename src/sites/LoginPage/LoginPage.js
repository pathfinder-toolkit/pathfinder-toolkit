import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import NavigationBar from "../../components/Navigation/NavigationBar";
import history from "../../utils/history";

const LoginPage = () => {
  const { user, isLoggedIn, fakeLogin } = useBackend();
  const [usernameInput, setUsernameInput] = useState("");

  const _handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const _handleSubmit = () => {
    fakeLogin(usernameInput);
    history.push("/");
  };

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <div>
            {isLoggedIn ? (
              <Typography align="center" variant="h5">
                Logged in as {user}.
              </Typography>
            ) : (
              <Typography align="center" variant="h5">
                Logged out.
              </Typography>
            )}

            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="User"
                autoFocus
                onChange={_handleUsernameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={_handleSubmit}
              >
                Login
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
