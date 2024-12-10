import { DatabaseModel } from "./DatabaseModel";

/* Classe que representa Cliente */
export class Cliente {

    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private telefone: string;

    constructor(nome: string, cpf: string, telefone: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    static async listagemClientes(): Promise<Array<Cliente> | null> {
        const listaDeClientes: Array<Cliente> = [];

        try {
            const querySelectCliente = `SELECT * FROM cliente`;
            const respostaBD = await DatabaseModel.pool.query(querySelectCliente);

            respostaBD.rows.forEach((linha: { nome: string; cpf: string; telefone: string; id_cliente: number; }) => {
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                );

                novoCliente.setIdCliente(linha.id_cliente);

                listaDeClientes.push(novoCliente);
            });
            
            return listaDeClientes;
        } catch (error) {
            console.log('Erro ao buscar lista de clientes.');
            console.log(error);
            return null;
        }
    }

    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', '${cliente.getCpf()}', '${cliente.getTelefone()}')
                                        RETURNING id_cliente`;

            const respostaBD = await DatabaseModel.pool.query(queryInsertCliente);

            if(respostaBD.rowCount !== 0) {
                console.log(`Cliente cadastrado com sucesso. ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o cliente.');
            console.log(error);
            return false;
        }
    }

    static async removerCliente(idCliente: number): Promise<boolean> {
        try {
            const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente=${idCliente}`;
            const respostaBD = await DatabaseModel.pool.query(queryDeleteCliente);

            if(respostaBD.rowCount !== 0) {
                console.log(`Cliente removido com sucesso. ID removido: ${idCliente}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao remover o cliente.');
            console.log(error);
            return false;
        }
    }

    static async atualizarCliente(cliente: Cliente): Promise<boolean> {
        try {
            const queryUpdateCliente = `UPDATE cliente SET
                                        nome = '${cliente.getNome()}',
                                        cpf = '${cliente.getCpf()}',
                                        telefone = '${cliente.getTelefone()}'
                                        WHERE id_cliente = ${cliente.getIdCliente()};`;

            const respostaBD = await DatabaseModel.pool.query(queryUpdateCliente);

            if(respostaBD.rowCount !== 0) {
                console.log(`Cliente atualizado com sucesso. ID: ${cliente.getIdCliente()}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao atualizar o cliente.');
            console.log(error);
            return false;
        }
    }
}

/* Classe que representa Empréstimo */
export class Emprestimo {
    static findOne(arg0: { where: { idLivro: string; }; }) {
        throw new Error("Method not implemented.");
    }

    private idEmprestimo: number = 0;
    private idAluno: number = 0;
    private idLivro: number = 0;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;

    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    static async cadastroEmprestimo(idAluno: number, idLivro: number, dataEmprestimo: Date, dataDevolucao: Date, statusEmprestimo: string): Promise<boolean> {
        try {
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
                                          VALUES
                                          (${idAluno}, ${idLivro}, '${dataEmprestimo.toISOString()}', '${dataDevolucao.toISOString()}', '${statusEmprestimo}')
                                          RETURNING id_emprestimo`;

            const respostaBD = await DatabaseModel.pool.query(queryInsertEmprestimo);

            if (respostaBD.rowCount !== 0) {
                console.log(`Empréstimo cadastrado com sucesso. ID do empréstimo: ${respostaBD.rows[0].id_emprestimo}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o empréstimo.');
            console.log(error);
            return false;
        }
    }

    static async listagemEmprestimos(): Promise<Array<Emprestimo> | null> {
        const listaDeEmprestimos: Array<Emprestimo> = [];

        try {
            const querySelectEmprestimos = `SELECT * FROM emprestimo`;
            const respostaBD = await DatabaseModel.pool.query(querySelectEmprestimos);

            respostaBD.rows.forEach((linha: { id_aluno: number; id_livro: number; data_emprestimo: string | number | Date; data_devolucao: string | number | Date; status_emprestimo: string; id_emprestimo: number; }) => {
                const novoEmprestimo = new Emprestimo(
                    linha.id_aluno,
                    linha.id_livro,
                    new Date(linha.data_emprestimo),
                    new Date(linha.data_devolucao),
                    linha.status_emprestimo
                );

                novoEmprestimo.setIdEmprestimo(linha.id_emprestimo);

                listaDeEmprestimos.push(novoEmprestimo);
            });

            return listaDeEmprestimos;
        } catch (error) {
            console.log('Erro ao buscar lista de empréstimos.');
            console.log(error);
            return null;
        }
    }
}