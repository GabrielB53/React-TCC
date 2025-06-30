import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useContext, useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import { Button, Badge, Box } from '@mui/material';
import { ThemeContext } from "../../contexts/ThemeContext";

const UsuariosLista = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarInativas, setMostrarInativas] = useState(false); 
    const { theme } = useContext(ThemeContext);

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';
    useEffect(() => {
        UsuarioService.findAll().then(
            (response) => {
                setUsuarios(response.data);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const lerUsuario = (id) => {
        navigate(`/usuarioeditar/${id}`);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/usuario'}
                    title={'Usuario'}
                    logo={logo}
                />

                <section className="p-2 m-2 shadow-lg">
                    <Box m={2} display="flex" alignItems="center">
                        <Button variant="contained" sx={{ position: 'relative', color: 'white', backgroundColor: 'black', }}>
                            Total de Usuarios
                            <Badge
                                badgeContent={usuarios.length}
                                color="error"
                                sx={{
                                    position: 'absolute',
                                    top: -1,
                                    right: -1,
                                    transform: 'translate(50%, -50%)',
                                }}
                            />
                        </Button>

                        <Link to={'/usuariolista'} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color={buttonColor} sx={{ ml:2 }}>
                                Lista
                            </Button>
                        </Link>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setMostrarInativas(!mostrarInativas)}
                            sx={{ ml: 2 }}
                        >
                            {mostrarInativas ? 'Ocultar Inativas' : 'Mostrar Inativas'}
                        </Button>
                    </Box>

                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Acesso</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios
                                    .filter(u => mostrarInativas || u.statusUsuario !== 'INATIVO')
                                    .map((usuario) => {
                                        console.log('dataCadastro raw:', usuario.dataCadastro);
                                        const dataFormatada = new Date(usuario.dataCadastro).toLocaleDateString('pt-BR');
                                        return (
                                            <tr key={usuario.id}>
                                                <td scope="row">{usuario.id}</td>
                                                <td>{usuario.nome}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.nivelAcesso}</td>
                                                <td>{dataFormatada}</td>
                                                <td>{usuario.statusUsuario}</td>
                                                <td>
                                                    <Button
                                                        variant="contained"
                                                        color="warning"
                                                        onClick={() => lerUsuario(usuario.id)}
                                                        size="small"
                                                        sx={{ display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <i className="bi bi-person-fill-gear me-2"></i>Abrir
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UsuariosLista;
