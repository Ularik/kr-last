import { useState } from "react";
import type { RegisterMutation } from "../../types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRegisterError } from "../../features/users/usersSelectors";
import { register } from "../../features/users/usersThunks";
import { useNavigate } from "react-router";
import FileInput from "../../components/UI/FileInput/FileInput";


const Register = () => {
  const [state, setState] = useState<RegisterMutation>({
    username: "",
    avatar: null,
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };


  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
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
            <Box
              component="form"
              noValidate
              onSubmit={submitFormHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    onChange={inputChangeHandler}
                    autoFocus
                    error={Boolean(getFieldError("username"))}
                    helperText={getFieldError("username")}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    onChange={inputChangeHandler}
                    label="Password"
                    type="password"
                    id="password"
                    error={Boolean(getFieldError("password"))}
                    helperText={getFieldError("password")}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    onChange={inputChangeHandler}
                    label="confirmPassword"
                    type="confirmPassword"
                    id="confirmPassword"
                    error={Boolean(getFieldError("password"))}
                    helperText={getFieldError("password")}
                  />
                </Grid>
                <Grid size={12}>
                  <FileInput
                    name="avatar"
                    label="avatar"
                    onChange={fileInputChangeHandler}
                  />
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
              <Grid container sx={{justifyContent: "flex-end"}}>
                <Grid>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
