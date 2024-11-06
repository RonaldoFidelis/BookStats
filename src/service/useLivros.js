import { useState, useEffect } from "react"

function useLivros(consulta) {
	const [livros, setLivros] = useState([]);
	const [encontrados, setEncontrados] = useState(0);
	const [carregamento, setCarregamento] = useState(false);
	const [erro, setErro] = useState(null);

	useEffect(() => {

		if (!consulta) return;

		const fetchLivros = async () => {
			setCarregamento(true);
			setErro(null);

			const chaveApi = import.meta.env.VITE_REACT_APP_API_KEY;
			const url = `https://www.googleapis.com/books/v1/volumes?q=${consulta}+inauthor&key=${chaveApi}`;


			try {
				const response = await fetch(url);
				const data = await response.json();
				setEncontrados(data.totalItems)
				setLivros(data.items || []);
			} catch (e) {
				setErro(e);
				console.error(e)
			} finally {
				setCarregamento(false);
			}

		}

		fetchLivros();

	}, [consulta]);

	return { livros, encontrados, carregamento, erro};

}

export default useLivros
