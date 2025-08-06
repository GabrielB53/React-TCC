import http from '../common/http-common';

const API_URL = "cardapio/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};
const create = (data) => {
    const formData = new FormData();

    const cardapioPayload = {
        nome: data.nome,
        diaServido: data.diaServido,
        pratoId: data.pratoId,
        statusCardapio: data.statusCardapio
    };

    formData.append('cardapio', JSON.stringify(cardapioPayload));

    if (data.fotoFile) {
        formData.append('file', data.fotoFile);
    }

    return http.mainInstance.post("http://localhost:8080/cardapio/create", formData);
};


const editar = (id, data) => {
    return http.mainInstance.put(API_URL + `editar/${id}`, data);
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.mainInstance.put(API_URL + `reativar/${id}`);
};

const findByNome = (nome) => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const CardapioService = {
    findAll,
    findById,
    create,
    editar,
    inativar,
    reativar,
    findByNome
};

export default CardapioService;
