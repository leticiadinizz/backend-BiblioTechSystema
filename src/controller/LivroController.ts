import { Request, Response } from "express";
import { Livro } from "../model/Livro";
import { RequestHandler } from 'express';
import { ParsedQs } from 'qs';

interface LivroDTO {
    titulo: string,
    autor: string,
    editora: string,
    anoPublicacao: string,
    isbn: string,
    quantTotal: number,
    quantDisponivel: number,
    valorAquisicao: number,
    statusLivroEmprestado: string
}

/**
 * A classe `LivroController` estende a classe `Livro` e é responsável por controlar as requisições relacionadas aos livros.
 * 
 * - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "livro".
 * - Herdando de `Livro`, ela pode acessar os métodos e propriedades da classe base.
 */
export class LivroController extends Livro {
    static cadastrar: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;
    static remover: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;
    static atualizar: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;

    /**
     * Lista todos os livros.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de livros em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de livros.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeLivros = await Livro.listagemLivros();
            console.log(listaDeLivros);
            
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            console.log('Erro ao acessar a listagem de livros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de livros" });
        }
    }

    /**
     * Processa a requisição para cadastro de um novo livro.
     * 
     * Esta função extrai os dados do livro enviados no corpo da requisição e cria um objeto `Livro` com essas informações.
     * Em seguida, chama o método `cadastroLivro` para inserir o livro no banco de dados. A função retorna uma resposta JSON 
     * indicando sucesso ou falha no cadastro, conforme o resultado da operação.
     * 
     * @param {Request} req - Objeto de requisição do Express, que contém os dados do livro no corpo (`body`).
     * @param {Response} res - Objeto de resposta do Express, usado para enviar a resposta HTTP de volta ao cliente.
     * 
     * @returns {Promise<Response>} - Resposta HTTP JSON com uma mensagem de sucesso ou erro.
     * 
     * @throws {Error} - Em caso de erro, registra a mensagem no console e retorna um status 400 com uma mensagem JSON.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface LivroDTO
            const livroRecebido: LivroDTO = req.body;

            // instanciando um objeto do tipo Livro com as informações recebidas
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

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Livro.cadastroLivro(novoLivro);

            // verifica a resposta da função
            if (respostaClasse !== null) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar o livro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }
}
