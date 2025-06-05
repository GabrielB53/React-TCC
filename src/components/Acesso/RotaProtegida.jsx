import { Navigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import AcessoNegado from "../../templates/Home/AcessoNegado";

const RotaProtegida = ({ children }) => {
  const currentUser = UsuarioService.getCurrentUser();

  if (!currentUser) {
    // Se quiser redirecionar para login, use:
    // return <Navigate to="/login" replace />;
    
    // Ou exibe a página de acesso negado:
    return <AcessoNegado />;
  }

  // Se o usuário estiver logado, renderiza o conteúdo protegido
  return children;
};

export default RotaProtegida;
