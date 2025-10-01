import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Cardapio = () => {
    const navigate = useNavigate();

    const novoCardapio = () => {
        navigate('/addcardapio');
    };
    const alterarCardapio = () => {
        navigate('/cardapiolista');
    };
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/home'}
                    title={'Gerenciamento'}
                    logo={logo}
                />
                <section className="caixota mt-2 mb-2">
                    <div className="d-flex justify-content-between">
                        <h3 className="pb-2">Cardápios</h3>
                        <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                            <Button onClick={novoCardapio}>Adicionar</Button>
                            <Button onClick={alterarCardapio}>Lista</Button>
                        </ButtonGroup>
                    </div>
                </section>
                                <section className="caixota mt-2 mb-2">
                    <div className="d-flex justify-content-between">
                        <h3 className="pb-2">Categorias</h3>
                        <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                            <Button onClick={novoCardapio}>Adicionar</Button>
                            <Button onClick={alterarCardapio}>Lista</Button>
                        </ButtonGroup>
                    </div>
                </section>
                <section className="caixota mt-2 mb-2">
                    <div className="d-flex justify-content-between">
                        <h3 className="pb-2">Pratos</h3>
                        <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                            <Button onClick={novoCardapio}>Adicionar</Button>
                            <Button onClick={alterarCardapio}>Lista</Button>
                        </ButtonGroup>
                    </div>
                </section>
                <section className="caixota mt-2 mb-2">
                    <div className="d-flex justify-content-between">
                        <h3 className="pb-2">Produtos</h3>
                        <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                            <Button onClick={novoCardapio}>Adicionar</Button>
                            <Button onClick={alterarCardapio}>Lista</Button>
                        </ButtonGroup>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Cardapio