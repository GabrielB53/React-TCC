import { Link, useNavigate } from "react-router-dom";
import './Sidebar.css';
import perfil from '../../assets/images/Logozinha.png'
import UsuarioService from "../../services/UsuarioService";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";


const Sidebar = () => {

    const currentUser = UsuarioService.getCurrentUser();
    const [theme, setTheme] = useState(() => localStorage.getItem('tema') || 'Claro');
    const navigate = useNavigate();

    const logout = () => {
        UsuarioService.logout();
        navigate("/");
    }

    const editar = (id) => {
        navigate(`/usuarioperfil/` + id)
    }

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return (
        <>
            {currentUser ?
                <div className="sidebar">
                    <form onSubmit={logout} className="d-flex flex-column justify-content-around align-items-center m-1 py-2 border-bottom rounded">
                        <img src={currentUser.foto ? currentUser.foto : perfil} alt="logo" className="mt-2 w-25" />
                        <div className="my-2">
                            <span className="fw-bold fst-italic">{currentUser.nome}</span>
                        </div>
                        <div>
                            <ButtonGroup variant="contained" color={buttonColor} aria-label="Basic button group">
                                <Button onClick={logout}>Sair</Button>
                                <Button onClick={() => editar(currentUser.id)}>Abrir</Button>
                            </ButtonGroup>
                        </div>
                    </form>

                    <nav className="nav  flex-column">
                        <Link className="nav-link" aria-current="page" to={'/home'}>Dashboard</Link>
                        <Link className="nav-link" to={'/mensagem'}>Mensagem</Link>
                        <Link className="nav-link" to={'/usuario'}>Usuário</Link>
                        <Link className="nav-link" to={'/grafico'}>Gráfico</Link>
                        <Link className="nav-link" to={'/cardapio'}>Cardápio</Link>
                    </nav>
                </div> :
                <></>
            }
        </>
    )
}

export default Sidebar