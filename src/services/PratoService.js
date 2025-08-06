import http from '../common/http-common';
const API_URL = "usuario/";


const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);

    return http.mainInstance.post(API_URL + "create", formData);
};

const update = (id, data) => {
    return http.multipartInstance.put(API_URL + `editar/${id}`, data);
};


const inativar = (id) => {
    return http.multipartInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.multipartInstance.put(API_URL + `reativar/${id}`);
};

const findByNome = (nome) => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const UsuarioService = {
    findAll,
    findById,
    create,
    update,
    inativar,
    reativar,
    findByNome,
}

export default UsuarioService;