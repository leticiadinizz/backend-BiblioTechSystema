import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um Livro.
 */
export class Livro {
    static findByPk(id: string) {
        throw new Error("Method not implemented.");
    }
    /**
     * Identificador único do livro.
     */
    private idLivro: number = 0;
    /**
     * Título do livro.
     */
    private titulo: string;
    /**
     * Autor do livro.
     */
    private autor: string;
    /**
     * Editora do livro.
     */
    private editora: string;
    /**
     * Ano de publicação do livro.
     */
    private anoPublicacao: string;
    /**
     * ISBN do livro.
     */
    private isbn: string;
    /**
     * Quantidade total de cópias do livro.
     */
    private quantTotal: number = 0;
    /**
     * Quantidade de cópias disponíveis para empréstimo.
     */
    private quantDisponivel: number = 0;
    /**
     * Valor de aquisição do livro.
     */
    private valorAquisicao: number = 0;
    /**
     * Status do livro em relação a empréstimos.
     */
    private statusLivroEmprestado: string;

    /**
     * Construtor da classe Livro.
     * @param titulo - Título do livro.
     * @param autor - Autor do livro.
     * @param editora - Editora do livro.
     * @param anoPublicacao - Ano de publicação do livro.
     * @param isbn - ISBN do livro.
     * @param quantTotal - Quantidade total de cópias do livro.
     * @param quantDisponivel - Quantidade de cópias disponíveis para empréstimo.
     * @param valorAquisicao - Valor de aquisição do livro.
     * @param statusLivroEmprestado - Status do livro em relação a empréstimos.
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: string,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.isbn = isbn;
        this.quantTotal = quantTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /**
     * Obtém o identificador do livro.
     * @returns O identificador do livro.
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro.
     * @param idLivro - Novo identificador do livro.
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    // Métodos estáticos

    /**
     * Busca e retorna uma lista de livros do banco de dados.
     * @returns Um array de objetos do tipo `Livro` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     */
    static async listagemLivros(): Promise<Array<Livro> | null> {
        const listaDeLivros: Array<Livro> = [];

        try {
            const querySelectLivros = `SELECT * FROM livros;`;
            const respostaBD = await database.query(querySelectLivros);

            respostaBD.rows.forEach((linha) => {
                const novoLivro = new Livro(
                    linha.titulo,
                    linha.autor,
                    linha.editora,
                    linha.ano_publicacao,
                    linha.isbn,
                    linha.quant_total,
                    linha.quant_disponivel,
                    parseFloat(linha.valor_aquisicao),
                    linha.status_livro_emprestado
                );

                novoLivro.setIdLivro(linha.id_livro);

                listaDeLivros.push(novoLivro);
            });

            return listaDeLivros;
        } catch (error) {
            console.log("Erro ao buscar lista de livros.");
            return null;
        }
    }

    /**
     * Cadastra um novo livro no banco de dados.
     * @param titulo - Título do livro.
     * @param autor - Autor do livro.
     * @param editora - Editora do livro.
     * @param anoPublicacao - Ano de publicação do livro.
     * @param isbn - ISBN do livro.
     * @param quantTotal - Quantidade total de cópias do livro.
     * @param quantDisponivel - Quantidade de cópias disponíveis para empréstimo.
     * @param valorAquisicao - Valor de aquisição do livro.
     * @param statusLivroEmprestado - Status do livro em relação a empréstimos.
     * @returns `true` se o cadastro foi bem-sucedido, `false` caso contrário.
     */
    static async cadastroLivro(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: string,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string
    ): Promise<boolean> {
        try {
            const queryInsertLivro = `INSERT INTO livros (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                                      VALUES ('${titulo}', '${autor}', '${editora}', '${anoPublicacao}', '${isbn}', ${quantTotal}, ${quantDisponivel}, ${valorAquisicao}, '${statusLivroEmprestado}')
                                      RETURNING id_livro;`;

            const respostaBD = await database.query(queryInsertLivro);

            if (respostaBD.rowCount != 0) {
                console.log(`Livro cadastrado com sucesso! ID: ${respostaBD.rows[0].id_livro}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log("Erro ao cadastrar o livro. Consulte os logs para mais detalhes.");
            console.log(error);
            return false;
        }
    }
}