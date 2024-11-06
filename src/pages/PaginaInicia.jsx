import { useState } from "react";
import useLivros from "../service/useLivros";

function PaginaInicial() {
	const [consulta, setConsultas] = useState("");
	const { livros, encontrados, carregamento } = useLivros(consulta);

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
									<h2>{livro.volumeInfo.title}</h2>
									<p>{livro.volumeInfo.authors ? livro.volumeInfo.authors.join(", ") : "Autor desconhecido"}</p>
									<p>{livro.volumeInfo.description || "Sem descrição"}</p>
									{livro.volumeInfo.imageLinks && (
										<img src={livro.volumeInfo.imageLinks.thumbnail} alt={livro.volumeInfo.title} />
									)}
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
