import React, { createContext, useState, useEffect } from 'react';

// Criação do contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('Claro');

    // Carrega o tema salvo no localStorage ou define como 'Claro' por padrão
    useEffect(() => {
        const savedTheme = localStorage.getItem('tema') || 'Claro';
        setTheme(savedTheme);
        applyTheme(savedTheme); // Aplica o tema no body
    }, []);

    // Função para aplicar o tema diretamente no body
    const applyTheme = (theme) => {
        if (theme === 'Escuro') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };

    // Função para alternar entre 'Claro' e 'Escuro'
    const toggleTheme = () => {
        const newTheme = theme === 'Claro' ? 'Escuro' : 'Claro';
        setTheme(newTheme);
        localStorage.setItem('tema', newTheme); // Salva no localStorage
        applyTheme(newTheme); // Aplica o tema no body
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
