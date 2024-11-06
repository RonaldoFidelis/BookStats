import { useState, useEffect } from "react"

/**
 * useLivro - Hook personalizado para busca de livros na API do Google Books
 *
 * Este hook tem como objetivo modularizar as requisições à API, fornecendo
 * uma maneira mais clara e reutilizável de buscar livros. Ele organiza o código,
 * facilita o gerenciamento de estado e trata de informações sensíveis, como a chave
 * de API de forma mais segura.
 *
 * O hook gerencia o estado de carregamento, erro e os dados retornados, permitindo
 * que o componente que o utilizar acesse facilmente as informações necessárias sem
* ter que recriar a lógica a cada interação.
 */

function useLivros(consulta) {
	const [livros, setLivros] = useState([]); // Livros encontrandos
	const [encontrados, setEncontrados] = useState(0); // Qtd. de livros encontrados
	const [carregamento, setCarregamento] = useState(false); // Gerenciar se o estado de carregamento está ativo ou não, permitindo implementar alguma funcionalidade durante a pesquisa
	const [erro, setErro] = useState(null); // Captura o erro

	/**
	 * useEffect - Monitoramento da consulta para disparar a função fetchLivros
	 *
	 * O hook foi useEffect utilizado para observar as mudanças na consulta..
	 * Sempre que a consulta for alterada, ele chama a função fetchLivros para buscar
	 * os novos resultados da API, garantindo que a aplicação seja atualizada com
	 * inputs recentes conforme o usuário interage com a pesquisa.
	 */
	useEffect(() => {
		if (!consulta) return;

		const fetchLivros = async () => {
			setCarregamento(true);
			setErro(null);

			const chaveApi = import.meta.env.VITE_REACT_APP_API_KEY;
			const urlGenerico = `https://www.googleapis.com/books/v1/volumes?q=${consulta}+inauthor&key=${chaveApi}`;

			try {
				const respostaGenerico = await fetch(urlGenerico);
				const dadoGenerico = await respostaGenerico.json();

				if (dadoGenerico.items && dadoGenerico.items.length > 0) {
					setEncontrados(dadoGenerico.totalItems);

					/** Segundo a documentação da própria API, cada objeto JSON possui
 					* um atributo chamado 'selfLink'. As informações sobre a média de avaliação
 					* do livro estão disponíveis apenas no 'selfLink' do objeto específico.
 					* A ideia é criar uma segunda interação usando uma promise para capturar
 					* os dados específicos de cada objeto.
 					*/
					const promessas = dadoGenerico.items.map(async (item) => {
						const urlLivroEspecifico = item.selfLink;
						const respostaEspecifica = await fetch(urlLivroEspecifico);
						const dadoEspecifico = await respostaEspecifica.json();

						// retorno um objeto já com os atributos requisitados.
						return {
							id: item.id,
							titulo: item.volumeInfo.title,
							autor: item.volumeInfo.authors,
							descricao: item.volumeInfo.description,
							genero: item.volumeInfo.categories,
							imagem: item.volumeInfo.imageLinks,
							avalicao: dadoEspecifico.volumeInfo.averageRating || 0
						};

					});

					// Aguarda todas as requisições e armazena os dados
					const livrosComDetalhes = await Promise.all(promessas);

					setLivros(livrosComDetalhes);
				} else {
					setLivros([]);
				}
			} catch (e) {
				setErro(e);
				console.error(e);
			} finally {
				setCarregamento(false);
			}
		};

		fetchLivros();
	}, [consulta]);

	return { livros, encontrados, carregamento, erro };

}

export default useLivros
