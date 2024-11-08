import { useState } from "react";
import { useQuery } from "react-query";
import Api from "../service/Api";

const PaginaInicial = () => {
  const { getLivros } = Api();
  const [inputPesquisa, setInputPesquisa] = useState("");
  const { data, isLoading, isError, error , isFetching, refetch } = useQuery('livros', () => getLivros(inputPesquisa), {
    enabled: false,
  });

  const handleInput = (e) => {
    setInputPesquisa(e.target.value);
  };

  const handlePesquisa = () => {
    if (inputPesquisa.trim() === "") return;
    refetch();
  };

  if(isLoading || isFetching) {
    return <p>Carregando...</p>
  }
  if(isError) {
    return <p>{error.mensage}</p>
  }

  return (
    <div>
      <h1>Lista de Livros</h1>

      <input
        type="text"
        value={inputPesquisa}
        onChange={handleInput}
        placeholder="Pesquisar por livros"
      />

      <button onClick={handlePesquisa} disabled={isLoading}>
        {isLoading ? "Carregando..." : "Pesquisar"}
      </button>

      {/* Exibindo resultados */}
      {data && (
        <>
          <p>Livros encontrados: {data.totalItems}</p>
          <ul>
            {data.items.map((livro) => (
              <li key={livro.id}>
                <h1>{livro.volumeInfo.title}</h1>
                <h2>{livro.volumeInfo.subtitle}</h2>
                <p>{livro.volumeInfo.authors?.join(", ")}</p>
                {livro.volumeInfo.imageLinks && (
                  <img
                    src={livro.volumeInfo.imageLinks.thumbnail}
                    alt={livro.volumeInfo.title}
                  />
                )}
                <h3>{livro.volumeInfo.description}</h3>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PaginaInicial;
