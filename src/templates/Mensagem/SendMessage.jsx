
import React, { useState, useEffect } from 'react';
import MensagemService from "../../services/MensagemService"
import logo from '../../assets/images/home.png';
import './FaleConosco.css'
import Sidebar from "../../components/Menu/Sidebar";
import Header from "../../components/Header/Header";

const FaleConosco = () => {
    const [formData, setFormData] = useState({
        emissor: "",
        email: "",
        texto: "",
        telefone: "",
    });
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        MensagemService.create({
            emissor: formData.emissor,
            email: formData.email,
            telefone: formData.telefone,
            texto: formData.texto

        }).then(() => {
            setMessage("Mensagem enviada com sucesso!");
            setSuccessful(true);
        }).catch((error) => {
            const msg = error.response?.data?.message || "Erro ao enviar mensagem";
            setMessage(msg);
        });
    }


    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/home'}
                    title={'Usuário'}
                    logo={logo}
                />
                <div className="d-flex justify-content-center">
                    <form className="form-fale row g-2 rounded-2 shadow" onSubmit={handleSubmit}>
                        <p className="h3 text-center">Fale Conosco</p>
                        {!successful && (
                            <>
                                <div className="col-md-6">
                                    <label htmlFor="inputEmissor" className="form-label fw-bold">Emissor:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="emissor"
                                        value={formData.emissor}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputemail" className="form-label fw-bold">email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputtelefone" className="form-label fw-bold">telefone:</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputtexto" className="form-label fw-bold">texto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="texto"
                                        value={formData.texto}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-12 my-2">
                                    <button type="submit" className="btn btn-primary">
                                        Gravar
                                    </button>
                                </div>
                            </>
                        )}
                        {message && (
                            <div className="m-1">
                                <div className={
                                    "text-center h4 fst-italic py-4 rounded-2 border border-5 " + (successful ? "border-success" : "border-danger")
                                }>
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FaleConosco