import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Adicione Yup para validação
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const UsuarioNovo = () => {
    const [dados, setDados] = useState({});
    const [clicou, setClicou] = useState(false);
    const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('Nome é obrigatório'),
        dataCardapio: Yup.string().required('Data é obrisgatória'),
        principal: Yup.string().required('É necessário preencher!'),
        acompanhamento: Yup.string().required('É necessário preencher!'),
        adicional: Yup.string().required('É necessário preencher!')
    });

    const enviarDados = () => {
        axios.post('http://localhost:8080/cardapio', dados)
            .then(response => {
                console.log(response);
                setAlerta({ show: true, message: 'Dados enviados com sucesso!', type: 'success' });
            })
            .catch(error => {
                console.log(error);
                setAlerta({ show: true, message: 'Erro ao enviar dados.', type: 'error' });
            })
            .finally(() => {
                setClicou(false); // Reset clicou após o envio
            });
    };

    useEffect(() => {
        if (clicou) {
            enviarDados();
        }
    }, [clicou]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/cardapio'}
                    title={'Novo Cardápio'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    {alerta.show && (
                        <Alert
                            icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
                            severity={alerta.type}
                            className="alert-position"
                            onClose={() => setAlerta({ show: false, message: '', type: '' })}
                        >
                            {alerta.message}
                        </Alert>
                    )}
                    <Formik
                        initialValues={{
                            nome: '',
                            dataCardapio: '',
                            principal: '',
                            acompanhamento: '',
                            adicional: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            setDados(values);
                            setClicou(true);
                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit} className="row g-3">
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.nome}
                                        placeholder="Nome"
                                        name="nome"
                                    />
                                    {props.touched.nome && props.errors.nome && (
                                        <div id="feedback">{props.errors.nome}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="date"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.dataCardapio}
                                        name="dataCardapio"
                                    />
                                    {props.touched.dataCardapio && props.errors.dataCardapio && (
                                        <div id="feedback">{props.errors.dataCardapio}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.principal}
                                        name="principal"
                                        placeholder="Arroz e feijão"
                                    />
                                    {props.touched.principal && props.errors.principal && (
                                        <div id="feedback">{props.errors.principal}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.acompanhemento}
                                        name="acompanhamento"
                                        placeholder="Almôndega"
                                    />
                                    {props.touched.acompanhamento && props.errors.acompanhamento && (
                                        <div id="feedback">{props.errors.acompanhamento}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.adicional}
                                        name="adicional"
                                        placeholder="Salada de alfâce"
                                    />
                                    {props.touched.adicional && props.errors.adicional && (
                                        <div id="feedback">{props.errors.adicional}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-secondary">SALVAR</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>
    );
}

export default UsuarioNovo;
