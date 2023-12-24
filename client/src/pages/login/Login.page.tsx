import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { FC, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../services/client";

const Copyright: FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Yarden Tamir "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const response: AxiosResponse = await client.post(`employee/login`, {
        email: data.get("email"),
        password: data.get("password"),
      });

      Cookies.set("accessToken", response.data.token);
      navigate("/board");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login failed:", axiosError.message);
    }
  };

  useEffect(() => {
    const token: string | undefined = Cookies.get("accessToken");
    if (token) navigate("/board");
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={dispatch(fetchEmployees("h"))}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignIn;
