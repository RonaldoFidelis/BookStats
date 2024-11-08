/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useLivroContext from "../hook/useLivroContext";
import Api from "../service/Api"

const PaginaInicial = () => {
  const [inputPesquisa, setInputPesquisa] = useState("");
  const { livros, setLivros, detalhe, setDetalhe } = useLivroContext();
  // eslint-disable-next-line no-unused-vars
  const { getLivros, getInfoDetalhada } = Api();
  const [carregamento, setCarregamento] = useState(false);
  const [erro, setErro] = useState(false);

  const handleInput = (e) => {
    setInputPesquisa(e.target.value);
  };

  useEffect(() => {
    handleConsulta();
  }, [])

  const handleConsulta = async () => {
    if(!inputPesquisa) return;

    try {
      setCarregamento(true);
      const dado = await getLivros(inputPesquisa);
      setLivros(dado);
      setInputPesquisa("");
    } catch (error) {
      setErro(error);
    } finally {
      setCarregamento(false);
    }
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      <input
        type="text"
        value={inputPesquisa}
        onChange={handleInput}
        placeholder="Pesquisar"
      />
      <button onClick={handleConsulta} disabled={carregamento}>
        {carregamento ? "Carregando..." : "Pesquisar"}
      </button>

      {carregamento && <p>Carregando...</p>}
      {erro && <p>Erro na busca</p>}
      <p>Livros encontrados: {livros.totalItems}</p>
      <ul>
          {livros.items.map((livro) => (
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
    </div>
  );
};


export default PaginaInicial;
