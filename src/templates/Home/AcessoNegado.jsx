import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/Logozinha.png'
import UsuarioService from "../../services/UsuarioService"
import './Home.css';

const AcessoNegado = () => {

    const currentUser = UsuarioService.getCurrentUser();

    return (
        <div className="container">
            <div className="p-3 w-100">
                <Header
                    goto={'/'}
                    title={'Acesso Negado!'}
                    logo={logo}
                />
                <div className="textao">
                <h2 className="text-center text-danger mt-5 py-2 width-100 ">
                    Acesso permitido apenas para pessoas autorizadas!
                </h2>
                </div>
            </div>
        </div>
    )
}

export default AcessoNegado