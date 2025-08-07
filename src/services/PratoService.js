import http from '../common/http-common';
const API_URL = "usuario/";


const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
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
    inativar,
    reativar,
    findByNome,
}

export default UsuarioService;