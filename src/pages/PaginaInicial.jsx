import { useState } from "react";
import { useQuery } from "react-query";
import Api from "../service/Api";
import BotaoAtivo from "../components/BotaoAtivo";
import BotaoDesativo from "../components/BotaoDisativado";

const PaginaInicial = () => {
  const { getLivros } = Api();
  const [inputPesquisa, setInputPesquisa] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery('livros', () => getLivros(inputPesquisa), {
    enabled: false,
  });

  const handleInput = (e) => {
    setInputPesquisa(e.target.value);
  };

  const handlePesquisa = () => {
    if (inputPesquisa.trim() === "") return;
    refetch();
  };

  return (
    <div>
      <h1>Lista de Livros</h1>

      <input
        type="text"
        value={inputPesquisa}
        onChange={handleInput}
        placeholder="Pesquisar por livros"
      />

      {(isLoading || isFetching) ? (
        <BotaoDesativo text={"Carregando"} />
      ) : (
        <BotaoAtivo onClick={handlePesquisa} text={"Buscar"} />
      )}


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
