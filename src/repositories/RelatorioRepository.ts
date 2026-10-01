import pool from "../database/connection";

export class RelatorioRepository{

    async livrosDisponiveis(): Promise<any[]>{
        const resultado = await pool.query(
            `SELECT livros.id, livros.titulo, livros.quantidade, autores.nome AS autor
            FROM livros
            INNER JOIN autores
               ON livros.autor_id = autores.id
            WHERE livros.quantidade > 0
            ORDER BY livros.titulo`
        )

        return resultado.rows;
    }

    async livrosEmprestados(): Promise<any[]> {
        const resultado = await pool.query(
            `SELECT livros.id, livros.titulo, clientes.nome AS cliente, emprestimos.data_emprestimo
            FROM emprestimos
            INNER JOIN livros
               ON emprestimos.livro_id = livros.id
            INNER JOIN clientes
               ON emprestimos.cliente_id = clientes.id
            WHERE emprestimos.data_devolucao IS NULL
            ORDER BY emprestimos.data_emprestimo`
        )

        return resultado.rows;
    }

    async livrosPorAutor(): Promise<any[]> {
        const resultado = await pool.query(
            `SELECT autores.nome AS autor,
            COUNT(livros.id) AS quantidade_livros
            FROM autores
            LEFT JOIN livros
               ON livros.autor_id = autores.id
            GROUP BY autores.id, autores.nome
            ORDER BY quantidade_livros DESC`
        )

        return resultado.rows;
    }

    async emprestimosPorLivro(): Promise<any[]> {
        const resultado = await pool.query(
            `SELECT livros.titulo,
            COUNT(emprestimos.id) AS quantidade_emprestimos
            FROM livros
            LEFT JOIN emprestimos
               ON emprestimos.livro_id = livros.id
            GROUP BY livros.id, livros.titulo
            ORDER BY quantidade_emprestimos DESC`
        )

        return resultado.rows;
    }

    async clientesComEmprestimosAtivos(): Promise<any[]>{
        const resultado = await pool.query(
            `SELECT clientes.id, clientes.nome, clientes.email,
            COUNT (emprestimos.id) AS emprestimos_ativos
            FROM clientes
            INNER JOIN emprestimos
               ON emprestimos.cliente_id = clientes.id
               WHERE emprestimos.data_devolucao IS NULL
               GROUP BY clientes.id, clientes.nome, clientes.email
               ORDER BY emprestimos_ativos DESC`
        )

        return resultado.rows;
    }
}
