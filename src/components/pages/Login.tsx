import * as yup from 'yup';
import { Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import userServiceInstance from '../../services/UserService';

interface LoginData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Debe ser un correo válido").required("Email es requerido"),
  password: yup.string().required("Contraseña es requerida"),
});

const Login: React.FC = () => {

  const {handleSubmit, control} = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    
  });

  const handleLogin = (data: LoginData) => {
    userServiceInstance.getUser(data.email).then((response) => {
      const data = response.getContentOrThrowError();
      console.log(data);
    })
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              autoComplete="email"
              autoFocus
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Box>
    </Container>

  );
};

export default Login;