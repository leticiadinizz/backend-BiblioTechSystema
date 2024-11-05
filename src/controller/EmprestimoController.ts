import { Request, RequestHandler, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";
import { ParsedQs } from 'qs';

interface EmprestimoDTO {
    idAluno: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: string
}

/**
 * A classe EmprestimoController estende a classe Emprestimo e é responsável por controlar as requisições relacionadas aos empréstimos.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "empréstimo".
 * - Herdando de Emprestimo, ela pode acessar os métodos e propriedades da classe base.
 */
export class EmprestimoController extends Emprestimo {
    static atualizar: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;
    static cadastrar: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;

    /**
     * Lista todos os empréstimos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de empréstimos em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de empréstimos.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaEmprestimos = await Emprestimo.listagemEmprestimos();

            return res.status(200).json(listaEmprestimos);
        } catch (error) {
            console.log('Erro ao acessar listagem de empréstimos');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de empréstimos" });
        }
    }
}
