import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Carrega o usuário do sessionStorage ao montar o provider
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar o usuário do sessionStorage:", error);
      setCurrentUser(null);
    }
  }, []);

  // Salva o usuário no sessionStorage sempre que mudar
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [currentUser]);

  const clearUser = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
