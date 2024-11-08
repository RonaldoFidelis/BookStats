import { useContext } from "react";
import { LivroContext } from "../context/LivroContext";

const useLivroContext = () => {
  const context = useContext(LivroContext);

  if (!context) {
    console.error("Erro: Context não identificado.");
  }

  return context;
};

export default useLivroContext;
