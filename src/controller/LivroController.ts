import { Request, Response } from "express";
import { Livro } from "../model/Livro";

/**
 * A interface `LivroDTO` define os dados que devem ser recebidos para o cadastro de um livro.
 * Ela é útil para garantir que os dados estejam no formato correto antes de serem processados.
 */
interface LivroDTO {
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: string;
    isbn: string;
    quantTotal: number;
    quantDisponivel: number;
    valorAquisicao: number;
    statusLivroEmprestado: string;
}

/**
 * A classe `LivroController` é responsável por controlar as requisições relacionadas aos livros.
 * Ela herda da classe `Livro` para aproveitar os métodos e propriedades já definidos nela.
 */
export class LivroController extends Livro {

    /**
     * Função para listar todos os livros no sistema.
     * Quando chamada, tenta acessar a lista de livros e retorna em formato JSON com status 200 (sucesso).
     * Se ocorrer um erro, retorna status 400 e uma mensagem de erro.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeLivros = await Livro.listagemLivros();
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            console.log('Erro ao acessar a listagem de livros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de livros" });
        }
    }

    /**
     * Função para cadastrar um novo livro.
     * Recebe os dados do livro através do corpo da requisição, cria um novo objeto `Livro`
     * e o registra no banco de dados.
     * Caso o cadastro seja bem-sucedido, retorna uma mensagem de sucesso com status 200.
     * Se falhar, retorna uma mensagem de erro com status 400.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            const livroRecebido: LivroDTO = req.body;

            const novoLivro = new Livro(
                livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado
            );

            const respostaClasse = await Livro.cadastroLivro;

            if (respostaClasse !== null) {
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o livro. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }
}