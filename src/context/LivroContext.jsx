import { createContext, useState } from "react";
/** LivroContext
 *
 * A principal ideia de utilizar o Contexto é garantir que os dados sobre os livros
 * fiquem centralizados e disponíveis em toda a aplicação, evitando a necessidade de
 * realizar múltiplas chamadas à API. Isso é especialmente útil em cenários onde os
 * dados dos livros são necessários em vários componentes, como por exemplo, para
 * a criação de gráficos ou exibição de informações detalhadas.
 */

export const LivroContext = createContext();

// Componente Provider
// eslint-disable-next-line react/prop-types
export const LivroContextProvider = ({ children }) => {
	const [livros, setLivros] = useState([]);  // Armazena os livros encontrados
	const [detalhe, setDetalhe] = useState(null);  // Detalhes do livro selecionado

	return (
		<LivroContext.Provider value={{ livros, setLivros, detalhe, setDetalhe}}>
			{children}
		</LivroContext.Provider>
	);
};
