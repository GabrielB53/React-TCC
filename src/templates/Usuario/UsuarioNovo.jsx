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
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        senha: Yup.string().required('Senha é obrigatória'),
        tipoUsuario: Yup.string().required('Selecione um tipo de usuário')
    });

    const enviarDados = () => {
        axios.post('http://localhost:8080/usuario', dados)
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
                    goto={'/usuario'}
                    title={'Novo Usuário'}
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
                            email: '',
                            senha: '',
                            tipoUsuario: 'Aluno',
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
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.email}
                                        name="email"
                                        placeholder="Emailegal@gmail.com"
                                    />
                                    {props.touched.email && props.errors.email && (
                                        <div id="feedback">{props.errors.email}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="password"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.senha}
                                        name="senha"
                                        placeholder="Senha"
                                    />
                                    {props.touched.senha && props.errors.senha && (
                                        <div id="feedback">{props.errors.senha}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <select
                                        className="form-select"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.tipoUsuario}
                                        name="tipoUsuario"
                                    >
                                        <option value="">Selecione o tipo</option>
                                        <option value="Aluno">Aluno</option>
                                        <option value="Funcionario">Funcionário</option>
                                    </select>
                                    {props.touched.tipoUsuario && props.errors.tipoUsuario && (
                                        <div id="feedback">{props.errors.tipoUsuario}</div>
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
