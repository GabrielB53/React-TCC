import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const UsuarioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        id: null,
        nome: "",
        email: "",
        nivelAcesso: "",
        dataCadastro: "",
        statusUsuario: ""
    });

    const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        UsuarioService.findById(id)
            .then((response) => {
                setUsuario(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setAlerta({ show: true, message: 'Erro ao buscar usuário.', type: 'error' });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        UsuarioService.update(id, usuario)
            .then(() => {
                setAlerta({ show: true, message: 'Usuário atualizado com sucesso!', type: 'success' });
                setTimeout(() => {
                    navigate('/usuarioslista');
                }, 1000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao atualizar usuário.', type: 'error' });
            });
    };

    const inativar = () => {
        UsuarioService.inativar(id)
            .then(() => {
                setAlerta({ show: true, message: 'Usuário inativado com sucesso!', type: 'success' });
                setTimeout(() => {
                    navigate('/usuarioslista');
                }, 1000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao inativar usuário.', type: 'error' });
            });
    };

    const reativar = () => {
        UsuarioService.reativar(id)
            .then(() => {
                setAlerta({ show: true, message: 'Usuário reativado com sucesso!', type: 'success' });
                setTimeout(() => {
                    navigate('/usuarioslista');
                }, 2000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao reativar usuário.', type: 'error' });
            });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/usuario'}
                    title={'Editar Usuário'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    {alerta.show && (
                        <Alert
                            icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
                            severity={alerta.type}
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                            onClose={() => setAlerta({ show: false, message: '', type: '' })}
                        >
                            {alerta.message}
                        </Alert>
                    )}

                    <form className="row g-2 m-5 p-2 rounded-2 shadow" onSubmit={handleSubmit}>
                        <div className="col-md-2">
                            <label htmlFor="inputID" className="form-label mb-1 fw-bold">ID:</label>
                            <input type="text" className="form-control" id="inputID" readOnly value={usuario.id || ''} />
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputNome"
                                name="nome"
                                value={usuario.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="inputEmail4" className="form-label mb-1 fw-bold">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                name="email"
                                value={usuario.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-4 my-3">
                            <label htmlFor="inputData" className="form-label mb-1 fw-bold">Data de Cadastro:</label>
                            <input type="text" className="form-control" id="inputData" readOnly value={usuario.dataCadastro || ''} />
                        </div>

                        <div className="col-md-4 my-3">
                            <label htmlFor="inputStatus" className="form-label mb-1 fw-bold">Status:</label>
                            <input type="text" className="form-control" id="inputStatus" readOnly value={usuario.statusUsuario || ''} />
                        </div>

                        <div className="col-md-4 my-3">
                            <label htmlFor="inputAcesso" className="form-label mb-1 fw-bold">Acesso:</label>
                            <select
                                id="inputAcesso"
                                name="nivelAcesso"
                                className="form-select"
                                value={usuario.nivelAcesso}
                                onChange={handleChange}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-12 mb-2 d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">
                                Gravar Alterações
                            </button>
                            <button type="button" className="btn btn-warning" onClick={reativar}>
                                Reativar / Resetar a Senha
                            </button>
                            <button type="button" className="btn btn-danger" onClick={inativar}>
                                Inativar Conta
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioEditar;
