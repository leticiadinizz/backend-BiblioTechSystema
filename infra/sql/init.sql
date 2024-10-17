-- CREATE ALUNO
CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

--INSIRA 10 ALUNOS INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES
('Evelyn', 'Hugo', '1985-07-16', '123 Hollywood Blvd, Los Angeles, CA', 'evelyn.hugo@email.com', '(11) 91234-5678'),
('Celia', 'James', '1990-04-10', '456 Sunset Ave, Los Angeles, CA', 'celia.james@email.com', '(11) 92345-6789'),
('Lucas', 'Ferreira', '1995-08-22', '789 Alameda Drive, São Paulo, SP', 'lucas.ferreira@email.com', '(11) 93456-7890'),
('Mariana', 'Silva', '2000-03-15', '321 Avenida Paulista, São Paulo, SP', 'mariana.silva@email.com', '(11) 94567-8901'),
('Thiago', 'Santos', '1992-11-02', '654 Rio de Janeiro St, Rio de Janeiro, RJ', 'thiago.santos@email.com', '(11) 95678-9012'),
('Beatriz', 'Almeida', '1998-06-30', '987 Rua das Flores, Curitiba, PR', 'beatriz.almeida@email.com', '(11) 96789-0123'),
('Rafael', 'Costa', '1987-12-12', '456 Avenida Beira Mar, Salvador, BA', 'rafael.costa@email.com', '(11) 97890-1234'),
('Ana', 'Pereira', '1993-09-28', '789 Rua Principal, Recife, PE', 'ana.pereira@email.com', '(11) 98901-2345'),
('Bruno', 'Oliveira', '1996-05-14', '123 Avenida Central, Brasília, DF', 'bruno.oliveira@email.com', '(11) 99012-3456'),
('Fernanda', 'Machado', '1999-01-05', '456 Rua da Praia, Fortaleza, CE', 'fernanda.machado@email.com', '(11) 90123-4567');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

--INSIRA 10 LIVROS
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES
('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 'Atria Books', 2017, '9781501161933', 5, 3, 45.90, 'Disponível'),
('Daisy Jones & The Six', 'Taylor Jenkins Reid', 'Ballantine Books', 2019, '9781524798628', 4, 4, 39.50, 'Disponível'),
('The Silent Patient', 'Alex Michaelides', 'Celadon Books', 2019, '9781250301697', 6, 5, 59.90, 'Não Disponível'),
('Where the Crawdads Sing', 'Delia Owens', 'G.P. Putnams Sons', 2018, '9780735219106', 8, 7, 49.90, 'Disponível'),
('Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 'Bloomsbury', 1997, '9780747532699', 10, 9, 39.90, 'Disponível'),
('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 'Bloomsbury', 1998, '9780747538493', 10, 8, 39.90, 'Disponível'),
('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 'Bloomsbury', 1999, '9780747542155', 10, 7, 39.90, 'Disponível'),
('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 'Bloomsbury', 2000, '9780747546245', 10, 6, 39.90, 'Disponível'),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'Harper', 2011, '9780062316097', 8, 7, 60.00, 'Disponível'),
('The Hobbit', 'J.R.R. Tolkien', 'George Allen & Unwin', 1937, '9780547928227', 4, 3, 55.00, 'Não Disponível');

--EMPRÉSTIMO
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

--INSIRA 10 EMPRESTIMOS
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-10-01', '2024-10-15', 'Em andamento'),
(2, 1, '2024-10-02', '2024-10-16', 'Em andamento'),
(3, 5, '2024-10-03', '2024-10-17', 'Em andamento'),
(4, 3, '2024-10-04', '2024-10-18', 'Devolvido'),
(5, 6, '2024-10-01', '2024-10-10', 'Devolvido'),
(6, 7, '2024-10-05', '2024-10-20', 'Em andamento'),
(7, 4, '2024-10-06', '2024-10-21', 'Em andamento'),
(8, 8, '2024-10-02', '2024-10-17', 'Devolvido'),
(9, 8, '2024-10-03', '2024-10-19', 'Em andamento'),
(10, 10, '2024-10-04', '2024-10-18', 'Devolvido');

----
SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;
