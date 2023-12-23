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
import { FC, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../features/counterSlice";
import axiosInstance from "../../services/client";
import type { RootState } from "../../store";

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
  const client = axiosInstance();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   // const resultAction = dispatch(fetchEmployees());
      //   // const result = resultAction.payload; // Access the payload from the action

      //   console.log(resultAction);
      // } catch (error) {
      //   console.error("Error fetching employees:", error);
      // }
      try {
        const response = await client.get(`employee/loadEmployees`);
        // const resultAction = dispatch(fetchEmployees());
        console.log(response);
        return response;
      } catch (error) {
        console.error(`Error fetching movie with :`, error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

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
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;