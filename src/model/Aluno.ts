import { DatabaseModel } from "./DatabaseModel";

// Armazenar o pool de conexões
const database = new DatabaseModel().pool;

export class Aluno {
    /* Atributos */
    /* Identificador do aluno */
    private idAluno: number = 0;
    /* Registro Acadêmico (RA) do aluno */
    private ra: string = "";
    /* Nome do aluno */
    private nome: string;
    /* Sobrenome do aluno */
    private sobrenome: string;
    /* Data de nascimento do aluno */
    private dataNascimento: Date;
    /* Endereço do aluno */
    private endereco: string;
    /* Email do aluno */
    private email: string;
    /* Celular do aluno */
    private celular: string;

    /**
     * Construtor da classe Aluno
     *
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email Email do aluno
     * @param celular Número de celular do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    public getRa(): string {
        return this.ra;
    }

    public setRa(ra: string): void {
        this.ra = ra;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getCelular(): string {
        return this.celular;
    }

    public setCelular(celular: string): void {
        this.celular = celular;
    }

    /**
     * Busca e retorna uma lista de alunos do banco de dados.
     * @returns Um array de objetos do tipo `Aluno` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        const listaDeAlunos: Array<Aluno> = [];

        try {
            const querySelectAluno = `SELECT * FROM aluno;`;
            const respostaBD = await database.query(querySelectAluno);

            respostaBD.rows.forEach((linha) => {
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.sobrenome,
                    linha.data_nascimento,
                    linha.endereco,
                    linha.email,
                    linha.celular
                );

                novoAluno.setIdAluno(linha.id_aluno);
                novoAluno.setRa(linha.ra);

                listaDeAlunos.push(novoAluno);
            });

            return listaDeAlunos;
        } catch (error) {
            console.log('Erro ao buscar lista de alunos. Verifique os logs para mais detalhes.');
            console.log(error);
            return null;
        }
    }

    /**
     * Realiza o cadastro de um aluno no banco de dados.
     * @param aluno Objeto contendo os dados do aluno a ser cadastrado.
     * @returns {Promise<boolean>} Retorna `true` se o cadastro foi bem-sucedido ou `false` caso contrário.
     */
    static async cadastrarAluno(aluno: Aluno): Promise<boolean> {
        try {
            const queryInsertAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                        VALUES
                                        ('${aluno.getNome()}',
                                         '${aluno.getSobrenome()}',
                                         '${aluno.getDataNascimento().toISOString().split('T')[0]}',
                                         '${aluno.getEndereco()}',
                                         '${aluno.getEmail()}',
                                         '${aluno.getCelular()}')
                                         RETURNING id_aluno;`;

            const respostaBD = await database.query(queryInsertAluno);

            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    /**
     * Remove um aluno do banco de dados com base no ID fornecido.
     * @param {number} idAluno O ID do aluno a ser removido.
     * @returns {Promise<boolean>} Retorna uma promessa que resolve para `true` se o aluno foi removido com sucesso ou `false` caso contrário.
     */
    static async removerAluno(idAluno: number): Promise<boolean> {
        try {
            const queryDeleteAluno = `DELETE FROM aluno WHERE id_aluno = ${idAluno}`;
            const respostaBD = await database.query(queryDeleteAluno);

            if (respostaBD.rowCount != 0) {
                console.log(`Aluno removido com sucesso. ID removido: ${idAluno}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log(`Erro ao remover aluno. Verifique os logs para mais detalhes.`);
            console.log(error);
            return false;
        }
    }

    /**
     * Atualiza as informações de um aluno no banco de dados.
     * @param aluno O objeto `Aluno` contendo as informações atualizadas.
     * @returns {Promise<boolean>} Retorna `true` se a atualização foi bem-sucedida ou `false` caso contrário.
     */
    static async atualizarAluno(aluno: Aluno): Promise<boolean> {
        try {
            const queryUpdateAluno = `UPDATE aluno SET
                                      nome = '${aluno.getNome()}',
                                      sobrenome = '${aluno.getSobrenome()}',
                                      data_nascimento = '${aluno.getDataNascimento().toISOString().split('T')[0]}',
                                      endereco = '${aluno.getEndereco()}',
                                      email = '${aluno.getEmail()}',
                                      celular = '${aluno.getCelular()}'
                                      WHERE id_aluno = ${aluno.getIdAluno()};`;

            const respostaBD = await database.query(queryUpdateAluno);

            if (respostaBD.rowCount != 0) {
                console.log(`Aluno atualizado com sucesso! ID: ${aluno.getIdAluno()}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log(`Erro ao atualizar o aluno. Verifique os logs para mais detalhes.`);
            console.log(error);
            return false;
        }
    }
}