import axios from "axios";
const chaveApi = import.meta.env.VITE_REACT_APP_API_KEY;
/** Api -> responsavel por realizar as requisições a BookApi
 *
 * A ideia é centralizar as requisiçõe ao Api de forma controlada
 * e organizada.
 *
 */
const Api = () => {

  /** getLivros - Realiza uma busca de dados genéricos de livros.
  *
  * Este método recebe um parâmetro de consulta (que pode ser o título do livro ou o
  * nome do autor)e faz uma requisição GET à API do Google Books.
  * Caso a resposta tenha o status "200" (OK), ele retorna os dados dos livros
  * correspondentes.
  *
  */
  const getLivros = async (consulta) => {
    if (!consulta) return;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${consulta}+inauthor&key=${chaveApi}&maxResults=20`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  /**
  * getInfoDetalhada - Recupera informações detalhadas de um livro a partir de seu
  * ID.
  * Este método funciona de maneira similar ao `getLivros`, mas é acionado quando o
  * usuário deseja obter mais detalhes sobre um livro específico, como a média de
  * avaliações e o número de avaliações registradas. Ele utiliza o `selfLink` do
  * livro para acessar essas informações adicionais.
  *
  */

  const getInfoDetalhada = async (id) => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(response.data.items);
        return response.data.items;
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return {
    getLivros,
    getInfoDetalhada,
  };
};

export default Api;
