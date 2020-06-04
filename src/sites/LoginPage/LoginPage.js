import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const LoginPage = () => {
  const { getUser } = useBackend();
  const [user] = useState(getUser);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <div>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="User"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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
