import { useState } from "react";
import useLivros from "../service/useLivros";

function PaginaInicial() {
	const [consulta, setConsultas] = useState("J.R.R Tolkien");
	const {livros ,encontrados, carregamento} = useLivros(consulta);

	console.log(livros);
	return (
		<div>
			<h1>Lista de Livros</h1>
			<p>Total de livros: {encontrados}</p>
			<input
				type="text"
				value={consulta}
				onChange={(e) => setConsultas(e.target.value)}
				placeholder="Pesquise por livros"
			/>
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
									<p>Média de avalição do livro: {livro.avaliacao}
									</p>
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
