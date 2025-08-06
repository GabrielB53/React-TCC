import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useState } from "react";
import CardapioService from "../../services/CardapioService";

const AddCardapio = () => {
    const [formData, setFormData] = useState({
        nome: "",
        pratoId: "",
        diaServido: "",
        statusCardapio: "ATIVO",
        fotoFile: null,
        fotoPreview: ""
    });

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                fotoFile: file,
                fotoPreview: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        // Validação básica
        if (!formData.pratoId || isNaN(formData.pratoId)) {
            setMessage("Por favor, informe um ID de prato válido.");
            return;
        }

        const data = new FormData();
        const cardapioJson = JSON.stringify({
            nome: formData.nome,
            pratoId: parseInt(formData.pratoId),
            diaServido: formData.diaServido,
            statusCardapio: formData.statusCardapio
        });
        data.append('cardapio', cardapioJson);

        if (formData.fotoFile) {
            data.append('file', formData.fotoFile);
        }

        CardapioService.create(data).then(
            (response) => {
                setMessage("Cardápio criado com sucesso!");
                setSuccessful(true);
            },
            (error) => {
                const message = error.response?.data?.message || "Erro ao criar cardápio.";
                setMessage(message);
            }
        );
    };

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
                    <form className="row g-2 m-5 p-2 rounded-2 shadow" onSubmit={handleSubmit}>
                        {!successful && (
                            <>
                                <div className="col-md-6">
                                    <label htmlFor="inputNome" className="form-label fw-bold">Nome:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputPratoId" className="form-label fw-bold">Prato ID:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="pratoId"
                                        value={formData.pratoId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputDia" className="form-label fw-bold">Dia Servido:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="diaServido"
                                        value={formData.diaServido}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputStatus" className="form-label fw-bold">Status:</label>
                                    <select
                                        className="form-select"
                                        name="statusCardapio"
                                        value={formData.statusCardapio}
                                        onChange={handleChange}
                                    >
                                        <option value="ATIVO">ATIVO</option>
                                        <option value="INATIVO">INATIVO</option>
                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inputFoto" className="form-label fw-bold">Imagem do Cardápio:</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {formData.fotoPreview && (
                                    <div className="col-md-12 text-center">
                                        <img
                                            src={formData.fotoPreview}
                                            alt="Preview"
                                            className="img-fluid rounded mt-3"
                                            style={{ maxHeight: "200px" }}
                                        />
                                    </div>
                                )}

                                <div className="col-12 my-2">
                                    <button type="submit" className="btn btn-primary">
                                        Gravar
                                    </button>
                                </div>
                            </>
                        )}

                        {message && (
                            <div className="col-12">
                                <div className={
                                    "text-center h4 fst-italic py-4 rounded-2 border border-5 " +
                                    (successful ? "border-success" : "border-danger")
                                }>
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddCardapio;
