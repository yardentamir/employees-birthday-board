import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AxiosError, AxiosResponse } from "axios";
import { parse } from "date-fns";
import Cookies from "js-cookie";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import client from "../../services/client";

const Copyright: React.FC<TypographyProps> = (props) => {
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

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      name: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
      birthDate: data.get("birthDate"),
    });

    const birthDate: string | undefined = data.get("birthDate")?.toString();
    try {
      if (
        !data.get("fullName") ||
        !data.get("email") ||
        !data.get("password") ||
        !birthDate
      ) {
        throw new Error("all the fields are required");
      }
      console.log("date", parse(birthDate, "dd/MM/yyyy", new Date()));
      const response: AxiosResponse = await client.post(`employee/signup`, {
        name: data.get("fullName"),
        email: data.get("email"),
        password: data.get("password"),
        birthDate: parse(birthDate, "dd/MM/yyyy", new Date()),
      });
      Cookies.set("accessToken", response.data.token);
      navigate("/board");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login failed:", axiosError.message);
    }
  };

  // React.useEffect(() => {
  //   const token: string | undefined = Cookies.get("accessToken");
  //   if (token) navigate("/board");
  // }, [navigate]);

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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  format="dd/MM/yyyy"
                  // value={selectedDay}
                  // onChange={(newValue) => {
                  //     setSelectedDay(newValue)
                  // }}
                  // remove slotProps to remove customization

                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      name: "birthDate",
                      id: "birthDate",
                      autoComplete: "bday",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
