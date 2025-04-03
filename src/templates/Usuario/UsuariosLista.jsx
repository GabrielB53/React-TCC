import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import axios from 'axios';
import { useEffect, useState } from "react";

const UsuariosLista = () => {
    
    const [dados, setDados] = useState([])
    const navigate = useNavigate();

    function receberDados(){
        axios.get('http://localhost:8080/usuario'
        ).then(response => {
            console.log(response.data)
            setDados(response.data)
        })
        .catch(error => console.log(error))
    }
    useEffect(()=>{
        receberDados()
    }, [])




    const ItensTable = () => dados.map(
        usuario => (
            <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.tipoUsuario}</td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => navigate('/usuarioeditar', { state: { usuario } })}
                    >
                        Alterar
                    </button>
                </td>
            </tr>
        )
    );

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/usuario'}
                    title={'Lista de Usuários'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ItensTable />
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UsuariosLista;
