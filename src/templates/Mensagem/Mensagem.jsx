import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import axios from 'axios';
import { useEffect, useState } from "react";

const Mensagem = () => {
    
    const [dados, setDados] = useState([])
    const navigate = useNavigate();

    function receberDados(){
        axios.get('http://localhost:8080/mensagem'
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
        mensagem => (
            <tr key={mensagem.id}>
                <td>{mensagem.id}</td>
                <td>{mensagem.dataMensagem}</td>
                <td>{mensagem.nome}</td>
                <td>{mensagem.emissor}</td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => navigate('/alterarmensagem', { state: { mensagem } })}
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
                    goto={'/mensagem'}
                    title={'Lista de Cardápios'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Emissor</th>
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

export default Mensagem;
