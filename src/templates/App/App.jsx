import React, { useContext } from 'react';
import './App.css';
import '../../components/Carousel/Style.css';
import Navbar from '../../components/Navbar/Navegacao';
import Caarousel from '../../components/Carousel/Nsei';
import SectionContent from '../../components/Secoes/SectionContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importar o contexto

function App() {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Usar o contexto para obter o tema

    const OPTIONS = {};
    const SLIDE_COUNT = 5;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    const login = () => {
        navigate("/login");
    }

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return (
        <div className={`opa ${theme === 'Escuro' ? 'dark-theme' : ''}`}> {/* Adicionar classe de tema */}
            <nav>
                <Navbar />
            </nav>
            <div className="container mb-5 ">
                <h1 className="text-center fw-bold m-4">Bem-vindo ao SGM!</h1>
                <section className="uepa">
                    <Caarousel slides={SLIDES} options={OPTIONS} />
                </section>
            </div>
            <main className="container">
                <SectionContent />
            </main>
            <footer>
                <Button onClick={login} color={buttonColor}>Acesso Restrito</Button>
            </footer>
        </div>
    );
}

export default App;
