import React, { useState } from "react";
import { useBackend } from "../../utils/BackendProvider";
import NavigationBar from "../../components/Navigation/NavigationBar"
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";

import history from "../../utils/history";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const { user, isLoggedIn, fakeLogin } = useBackend();
  const [usernameInput, setUsernameInput] = useState("");

  const classes = useStyles();

  const _handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const _handleSubmit = () => {
    fakeLogin(usernameInput);
    history.push("/");
  };

  return (
    <React.Fragment>
      <NavigationBar/>
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
                Login
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
                type="password"
                label="Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={_handleSubmit}
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
