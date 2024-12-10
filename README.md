# Projeto BiblioTechSystema
---

## **Scripts JSON para criar registros no Postman**

### **Criar Aluno**
**Endpoint**: `POST /cadastrar/aluno`  
**Body**:
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "99999-9999",
  "cpf": "12345678900",
  "dataNascimento": "2000-01-01"
}

{
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien",
  "editora": "HarperCollins",
  "anoPublicacao": 1954,
  "isbn": "1234567890123",
  "quantTotal": 10,
  "quantDisponivel": 8,
  "valorAquisicao": 50.99,
  "statusLivroEmprestado": false
}

{
  "idAluno": 1,
  "idLivro": 1,
  "dataEmprestimo": "2024-12-10",
  "dataDevolucao": "2024-12-20"
}

{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@email.com",
  "telefone": "88888-8888",
  "cpf": "98765432100",
  "dataNascimento": "1995-05-15"
}

{
  "idAluno": 2,
  "idLivro": 3,
  "dataEmprestimo": "2024-12-15",
  "dataDevolucao": "2025-01-15"
}