import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import axios from 'axios';
import { useEffect, useState } from "react";

const DeletarCardapio = () => {
    const [dados, setDados] = useState([])
    const [itemApagado, setItemApagado] = useState(false)

    function receberDados(){
        axios.get('http://localhost:8080/cardapio'
        ).then(response => {
            console.log(response.data)
            setDados(response.data)
        })
        .catch(error => console.log(error))
    }

    async function apagarDados(cardapio){
        axios.delete('http://localhost:8080/cardapio',
        {
            data : cardapio,
            headers: {                  
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization", 
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
                "Content-Type": "application/json;charset=UTF-8"                   
            },
        })
        .then(response => {
            console.log(response)
            console.log('Dados apagados!')
            setItemApagado(true)
        })
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
        receberDados()
    }, [])

    useEffect(()=>{
        if(itemApagado)
            receberDados()
        return() =>{
            setItemApagado(false)
        }
    }, [itemApagado])
    
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
                        onClick={async ()=>{
                            await apagarDados(JSON.stringify(cardapio))
                        }} 
                    >
                        Deletar
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
                    title={'Deletar cardapio'}
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
    )
}

export default DeletarCardapio