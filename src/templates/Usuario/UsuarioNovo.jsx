import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import UsuarioService from "../../services/UsuarioService";

// Material UI components
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert
} from '@mui/material';

const UsuarioNovo = () => {
  const [formData, setFormData] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    UsuarioService.create(formData).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const message = error.response?.data?.message || "Erro ao salvar usuário";
        setMessage(message);
      }
    );
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box p={3} width="100%">
        <Header
          goto={'/usuario'}
          title={'Novo Usuário'}
          logo={logo}
        />
        <Box m={2} p={2} boxShadow={3} borderRadius={2}>
          <form onSubmit={handleSubmit} autoComplete="off">
            {!successful && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formData.nome || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="acesso-label">Acesso</InputLabel>
                    <Select
                      labelId="acesso-label"
                      id="inputAcesso"
                      name="nivelAcesso"
                      value={formData.nivelAcesso || ""}
                      onChange={handleChange}
                      label="Acesso"
                    >
                      <MenuItem value="" disabled>
                        Nível de Acesso...
                      </MenuItem>
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Gravar
                  </Button>
                </Grid>
              </Grid>
            )}
            {message && (
              <Box mt={2}>
                <Alert severity={successful ? "success" : "error"}>
                  {message}
                </Alert>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UsuarioNovo;
