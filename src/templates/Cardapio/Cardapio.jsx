import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import './Cardapio.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Cardapio = () => {
    const navigate = useNavigate();

    const novoCardapio = () => {
        navigate('/addcardapio');  
    };
    const alterarCardapio = () => {
        navigate('/alterarcardapio');  
    };
    const deletarCardapio = () =>{
        navigate('/deletarcardapio')
    };
    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
                <Header 
                    goto={'/home'}
                    title={'Cardapio'}
                    logo={logo}
                    />
                    
                    <section className="mt-2 p-2 shadow-lg caixota">
                    <div className="d-flex justify-content-around">
                    <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                    <Button onClick={novoCardapio}>Adicionar</Button>
                    <Button onClick={alterarCardapio}>Alterar</Button>
                    <Button onClick={deletarCardapio}>Deletar</Button>
                    </ButtonGroup>
                    </div>
                </section>
                
           </div>
        </div>
    )
}

export default Cardapio