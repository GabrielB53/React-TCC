import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useEffect, useState } from "react";
import MensagemService from "../../services/MensagemService";
import { Button, Badge, Typography, Box } from '@mui/material'; // Importando componentes do MUI

const Mensagem = () => {
    const navigate = useNavigate();
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        MensagemService.findAll().then(
            (response) => {
                const mensagens = response.data;
                setMensagens(mensagens);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const lerMensagem = (id) => {
        navigate(`/mensagemler/` + id);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/home'}
                    title={'Mensagem'}
                    logo={logo}
                />
                <section className="p-2 m-2 shadow-lg">
                    <Box m={2}>
                        <Button variant="contained" color="info" sx={{ position: 'relative' }}>
                            Total de Mensagens
                            <Badge
                                badgeContent={mensagens.length}
                                color="error"
                                sx={{
                                    position: 'absolute',
                                    top: -1,
                                    right: -1,
                                    transform: 'translate(50%, -50%)',
                                }}
                            />
                        </Button>
                        <Link to={'/mensagemlista'} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="success" sx={{ ml: 2 }}>
                                Lista
                            </Button>
                        </Link>
                    </Box>
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Emissor</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mensagens?.map((mensagem) => {
                                    // Formatar a data para dd/mm/yyyy
                                    const dataFormatada = new Date(mensagem.dataMensagem).toLocaleDateString('pt-BR');

                                    return (
                                        <tr key={mensagem.id}>
                                            <td scope="row">{mensagem.id}</td>
                                            <td>{dataFormatada}</td>
                                            <td>{mensagem.emissorMensagem}</td>
                                            <td>{mensagem.email}</td>
                                            <td>{mensagem.statusMensagem}</td>
                                            <td>
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => lerMensagem(mensagem.id)}
                                                    size="small"
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                >
                                                    <i className="bi bi-envelope-open me-2"></i>Abrir
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

export default Mensagem;
