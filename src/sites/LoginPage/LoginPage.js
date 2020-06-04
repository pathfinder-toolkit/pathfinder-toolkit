import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from '@material-ui/core/styles';
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
