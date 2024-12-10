import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";
import { RequestHandler } from 'express';
import { ParsedQs } from 'qs';

interface AlunoDTO {
    ra: string;
    nome: string;
    sobrenome: string;
    data_nascimento: Date;
    endereco: string;
    email: string;
    celular: string;
}

/**
 * A classe `AlunoController` é responsável por controlar as requisições relacionadas aos alunos.
 */
export class AlunoController {

    /**
     * Lista todos os alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de alunos.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os alunos e armazena o resultado
            const listaDeAlunos = await Aluno.listarAlunos();

            // Retorna a lista de alunos para quem fez a requisição
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log("Erro ao acessar listagem de alunos:", error);

            // Retorna uma mensagem de erro para quem chamou a requisição
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de alunos" });
        }
    }

    /**
     * Método controller para cadastrar um novo aluno.
     * 
     * Esta função recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
     * e tenta cadastrar este aluno no banco de dados utilizando a função `cadastroAluno`. Caso o cadastro 
     * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
     * uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do aluno no formato `AlunoDTO`.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface AlunoDTO
            const alunoRecebido: AlunoDTO = req.body;

            // Instanciando um objeto do tipo Aluno com as informações recebidas
            const novoAluno = new Aluno(
                                       alunoRecebido.nome,
                                       alunoRecebido.sobrenome,
                                       alunoRecebido.data_nascimento,
                                       alunoRecebido.endereco,
                                       alunoRecebido.email,
                                       alunoRecebido.celular);

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Aluno.cadastrarAluno(novoAluno);

            // Verifica a resposta da função e retorna uma mensagem de sucesso ou erro
            if (respostaClasse !== null && respostaClasse !== undefined) {
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // Retorna uma mensagem de erro para quem chamou a requisição
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }
}