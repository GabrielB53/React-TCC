import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import axios from 'axios';
import { useEffect, useState } from "react";

const CardapioLista = () => {
    
    const [dados, setDados] = useState([])
    const navigate = useNavigate();

    function receberDados(){
        axios.get('http://localhost:8080/cardapio'
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
        cardapio => (
            <tr key={cardapio.id}>
                <td>{cardapio.id}</td>
                <td>{cardapio.nome}</td>
                <td>{cardapio.dataCardapio}</td>
                <td>{cardapio.principal}</td>
                <td>{cardapio.acompanhamento}</td>
                <td>{cardapio.adicional}</td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => navigate('/alterarcardapio', { state: { cardapio } })}
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
                    goto={'/cardapio'}
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
                                    <th scope="col">Principal</th>
                                    <th scope="col">Acompanhamento</th>
                                    <th scope="col">Adicional</th>
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

export default CardapioLista;
