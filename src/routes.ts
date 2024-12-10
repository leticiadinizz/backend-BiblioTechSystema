import {Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { Aluno } from "./model/Aluno";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    res.json({ mensagem: "Rota padrão" });
});

// CRLD Aluno
router.get('/lista/aluno', AlunoController.todos);
router.post('/cadastrar/aluno', AlunoController.novo);

// CRLD Livro
router.get('/lista/livro', LivroController.todos);
router.post('/cadastrar/livro', LivroController.novo);

// CRLD Empréstimo
router.get('/lista/emprestimo', EmprestimoController.todos);

export { router };