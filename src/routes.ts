import express from"express"
import { AlunoController } from "./controller/AlunoController";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";

const router = express.Router ();

router.get("/", (req, res) => {
    res.json({ mensagem: "Rota padrão" });
});

// CRLD Aluno
router.get('/lista/alunos', AlunoController.todos);
router.post('/cadastrar/aluno', AlunoController.cadastrar);

// CRLD Livro
router.get('lista/livros', LivroController.todos);
router.post('/cadastrar/livro', LivroController.cadastrar);

// CRLD Empréstimo
router.get('/lista/emprestimo', EmprestimoController.todos);

export { router };