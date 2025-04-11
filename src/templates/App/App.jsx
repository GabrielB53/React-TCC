import React, { useContext } from 'react';
import './App.css';
import Navbar from '../../components/Navbar/Navegacao';
import SectionContent from '../../components/Secoes/SectionContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importar o contexto
import CustomCarousel from '../../components/Carousel/Carousel';

function App() {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Usar o contexto para obter o tema

    const login = () => {
        navigate("/login");
    }

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return (
        <div className={`opa ${theme === 'Escuro' ? 'dark-theme' : ''}`}>
            <nav>
                <Navbar />
            </nav>
            <div className="container mb-5 ">
                <h1 className="text-center fw-bold m-4">Bem-vindo ao SGM!</h1>
                <section className="uepa">
                    <CustomCarousel />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        <br />
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        <br />
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        <br />
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        <br />
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
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
