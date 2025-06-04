import {useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Mensagem = () => {
    const navigate = useNavigate();

    const novoUser = () => {
        navigate('/mensagemnovo');  
    };
    const listaUser = () => {
        navigate('/mensagemlista');  
    };
    const deletarUser = () => {
        navigate('/mensagemdeletar');  
    };
    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
           <Header 
                    goto={'/home'}
                    title={'Mensagens'}
                    logo={logo}
                    />
               <section className="mt-2 p-2 shadow-lg caixota">
                    <div className="d-flex justify-content-around">
                    <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                    <Button onClick={novoUser}>Nova Mensagem</Button>
                    <Button onClick={listaUser}>Lista de Mensagens</Button>
                    </ButtonGroup>
                    </div>
                </section>
           </div>
        </div>
    )
}

export default Mensagem