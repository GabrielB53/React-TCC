import { Routes, Route } from "react-router-dom"
import App from "../templates/App/App"
import Home from "../templates/Home/Home"

import ForgotPass from "../templates/Login/ForgotPass"
import Login from "../templates/Login/Login"

import Mensagem from "../templates/Mensagem/Mensagem"
import MensagemLer from "../templates/Mensagem/MensagemLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import Grafico from "../templates/Graph/Grafico"
import AddCardapio from "../templates/Cardapio/AddCardapio"
import AlterarCardapio from "../templates/Cardapio/AlterarCardapio"
import DeletarCardapio from "../templates/Cardapio/DeletarCardapio"
import Cardapio from "../templates/Cardapio/Cardapio"
import UsuarioDeletar from "../templates/Usuario/UsuarioDeletar"
import { ThemeProvider } from "../contexts/ThemeContext"

const AppRoutes = () => {
  return (
    <ThemeProvider>
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<ForgotPass />} />

        <Route path="/mensagem" element={<Mensagem />} />
        <Route path="/mensagemler" element={<MensagemLer />} />


        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuarioslista" element={<UsuariosLista />} />
        <Route path="/usuarionovo" element={<UsuarioNovo />} />
        <Route path="/usuarioeditar" element={<UsuarioEditar />} />
        <Route path="/usuariodeletar" element={<UsuarioDeletar />} />
        
        <Route path="/grafico" element={<Grafico />} />
        <Route path="/addcardapio" element={<AddCardapio />} />
        <Route path="/alterarcardapio" element={<AlterarCardapio />} />
        <Route path="/deletarcardapio" element={<DeletarCardapio />} />
        <Route path="/cardapio" element={<Cardapio />} />
      </Routes>
     
    </div>
    </ThemeProvider>
  )
}
export default AppRoutes