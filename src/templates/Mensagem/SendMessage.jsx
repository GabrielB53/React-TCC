import MensagemService from "../../services/MensagemService"
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { ThemeContext } from "../../contexts/ThemeContext";

const FaleConosco = () => {

    const { theme } = useContext(ThemeContext);
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

    const textColor = theme === 'Claro' ? '' : 'white';
    const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';


    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/mensagem'}
                    title={'Enviar mensagem'}
                    logo={logo}
                />
                <section className="m-2 mt-5 p-2">
                    <form className="form-fale row g-2 rounded-2" onSubmit={handleSubmit} autoComplete="off">
                        {!successful && (
                            <>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Emissor"
                                            value={formData.emissor || ""}
                                            InputProps={{ readOnly: false, style: { color: textColor } }}
                                            InputLabelProps={{ style: { color: textColor } }}
                                            sx={{
                                                backgroundColor: background,
                                                borderRadius: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: textColor },
                                                    '&:hover fieldset': { borderColor: textColor },
                                                    '&.Mui-focused fieldset': { borderColor: textColor },
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={formData.email || ""}
                                            InputProps={{ readOnly: false, style: { color: textColor } }}
                                            InputLabelProps={{ style: { color: textColor } }}
                                            sx={{
                                                backgroundColor: background,
                                                borderRadius: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: textColor },
                                                    '&:hover fieldset': { borderColor: textColor },
                                                    '&.Mui-focused fieldset': { borderColor: textColor },
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            fullWidth
                                            label="Telefone"
                                            value={formData.telefone || ""}
                                            InputProps={{ readOnly: false, style: { color: textColor } }}
                                            InputLabelProps={{ style: { color: textColor } }}
                                            sx={{
                                                backgroundColor: background,
                                                borderRadius: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: textColor },
                                                    '&:hover fieldset': { borderColor: textColor },
                                                    '&.Mui-focused fieldset': { borderColor: textColor },
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextareaAutosize
                                            name="texto"
                                            value={formData.texto}
                                            onChange={handleChange}
                                            minRows={4}
                                            placeholder="Digite sua mensagem..."
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                fontSize: '16px',
                                                borderRadius: '5px',
                                                borderColor: textColor,
                                                backgroundColor: background,
                                                color: textColor
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <button type="submit" className="btn btn-primary">
                                    Gravar
                                </button>
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
                </section>
            </div>
        </div>
    )
}

export default FaleConosco