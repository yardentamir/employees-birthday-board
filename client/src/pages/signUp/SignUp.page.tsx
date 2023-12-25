import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AxiosResponse } from "axios";
import { format, parse } from "date-fns";
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
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const birthDate: string | undefined = data.get("birthDate")?.toString();

    try {
      if (
        !data.get("fullName") ||
        !birthDate ||
        !data.get("email") ||
        !data.get("password")
      ) {
        throw new Error("all the fields are required");
      }
      const parsedDate = parse(birthDate, "dd/MM/yyyy", new Date());

      const response: AxiosResponse = await client.post(`employee/signup`, {
        name: data.get("fullName"),
        email: data.get("email"),
        password: data.get("password"),
        birthDate: format(parsedDate, "yyyy-MM-dd"),
        timezone: sessionStorage.getItem("userTimezone"),
      });
      Cookies.set("accessToken", response.data.token);
      navigate("/board");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container sx={{ mb: 2 }}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
