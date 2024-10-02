import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const UsuarioEditar = () => {
    const { state } = useLocation(); // Pega os dados do usuário via location state
    const usuario = state.usuario; // Extrai o usuário do state
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        senha: Yup.string(),
        tipoUsuario: Yup.string().required('Selecione um tipo de usuário')
    });

    const handleFormSubmit = (values) => {
        axios.put(`http://localhost:8080/usuarionovo/${usuario.id}`, values)
            .then(response => {
                setAlerta({ show: true, message: 'Usuário atualizado com sucesso!', type: 'success' });
                setTimeout(() => {
                    navigate('/usuarioslista');
                }, 2000);
            })
            .catch(error => {
                setAlerta({ show: true, message: 'Erro ao atualizar usuário.', type: 'error' });
            });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/usuario'}
                    title={'Editar Usuário'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    {alerta.show && (
                        <Alert
                            icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
                            severity={alerta.type}
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                            onClose={() => setAlerta({ show: false, message: '', type: '' })}
                        >
                            {alerta.message}
                        </Alert>
                    )}
                    <Formik
                        initialValues={usuario} // Usa os dados do usuário como initialValues
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit} className="row g-3">
                                <div className="col-md-2">
                                    <label htmlFor="inputID" className="form-label">ID</label>
                                    <input type="text" className="form-control" id="inputID" readOnly 
                                        value={usuario.id} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputNome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNome"
                                        name="nome"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.nome}
                                    />
                                    {props.touched.nome && props.errors.nome && (
                                        <div id="feedback">{props.errors.nome}</div>
                                    )}
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail4"
                                        name="email"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.email}
                                    />
                                    {props.touched.email && props.errors.email && (
                                        <div id="feedback">{props.errors.email}</div>
                                    )}
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="inputSenha" className="form-label">Senha (Deixe em branco para não alterar)</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputSenha"
                                        name="senha"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.senha}
                                    />
                                    {props.touched.senha && props.errors.senha && (
                                        <div id="feedback">{props.errors.senha}</div>
                                    )}
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="inputAcesso" className="form-label">Acesso</label>
                                    <select
                                        id="inputAcesso"
                                        className="form-select"
                                        name="tipoUsuario"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.tipoUsuario}
                                    >
                                        <option value="">Selecione o tipo</option>
                                        <option value="Aluno">Aluno</option>
                                        <option value="Funcionario">Funcionário</option>
                                    </select>
                                    {props.touched.tipoUsuario && props.errors.tipoUsuario && (
                                        <div id="feedback">{props.errors.tipoUsuario}</div>
                                    )}
                                </div>

                                <div className="col-12 d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">
                                        Gravar Alterações
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>
    );
}

export default UsuarioEditar;
