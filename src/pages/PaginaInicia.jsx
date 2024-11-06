import { useState } from "react";
import useLivros from "../service/useLivros";

function PaginaInicial() {
	const [input, setInput] = useState("");
	const [consulta, setConsulta] = useState("");
	const {livros, carregamento} = useLivros(consulta);

	const handleInput = (event) => {
		setInput(event.target.value);
	};

	const handleQuery = () => {
		setConsulta(input);
		setInput("");
	};

	return (
		<div>
			<h1>Lista de Livros</h1>
			<input
				type="text"
				value={input}
				onChange={handleInput}
				placeholder="Pesquisar"
			/>
			<button onClick={handleQuery} disabled={carregamento}>
				{carregamento ? "Carregando":"Buscar"}
			</button>
			{carregamento ? (
				<p>Carregando...</p>
			) : (
				<div>
					{livros.length > 0 ? (
						<ul>
							{livros.map((livro, index) => (
								<li key={index}>
									<h2>{livro.titulo}</h2>
									<p>{livro.autor ? livro.autor.join(", ") : "Autor desconhecido"}</p>
									<p>{livro.descricao || "Sem descrição"}</p>
									{livro.imagem && (
										<img src={livro.imagem.thumbnail} alt={livro.titulo} />
									)}
									<p>Gênero: {livro.genero}</p>
									<p>Média de avaliação do livro: {livro.media}</p>
								</li>
							))}
						</ul>
					) : (
						<p>Nenhum livro encontrado.</p>
					)}
				</div>
			)}
		</div>
	);
}

export default PaginaInicial;
