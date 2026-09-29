import pool from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository{
    async criar(livroId: number, clienteId: number, dataEmprestimo: Date): Promise<Emprestimo>{

        const resultado = await pool.query(
            `INSERT INTO emprestimos
            (livro_id, cliente_id, data_emprestimo)
            VALUES ($1, $2, $3)
            RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao`, [livroId, clienteId, dataEmprestimo]
        )

        const emprestimo = resultado.rows[0]

        return new Emprestimo(
            emprestimo.id,
            emprestimo.livro_id,
            emprestimo.cliente_id,
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao
        )
    }

    async listar(): Promise<Emprestimo[]> {
        const resultado = await pool.query(
            `SELECT id, livro_id, cliente_id, data_emprestimo, data_devolucao
            FROM emprestimos
            ORDER BY id`
        )

        return resultado.rows.map(
            (emprestimo) => new Emprestimo(
                emprestimo.id,
                emprestimo.livro_id,
                emprestimo.cliente_id,
                emprestimo.data_emprestimo,
                emprestimo.data_devolucao
            )
        )
    }

    async buscarPorId(id: number): Promise<Emprestimo | null> {
        const resultado = await pool.query(
            `SELECT id, livro_id, cliente_id, data_emprestimo, data_devolucao
            FROM emprestimos
            WHERE id = $1`,[id]
        )

        if (resultado.rows.length === 0){
            return null
        }

        const emprestimo = resultado.rows[0];

        return new Emprestimo(
            emprestimo.id,
            emprestimo.livro_id,
            emprestimo.cliente_id,
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao
        )
    }

    async listarComDetalhes(): Promise<any[]> {
        const resultado = await pool.query(
            `SELECT
              emprestimos.id,
              clientes.nome AS cliente,
              livros.titulo AS livro,
              emprestimos.data_emprestimo,
              emprestimo.data_devolucao
            FROM emprestimos
            INNER JOIN clientes
              ON emprestimos.cliente_id = clientes.id
            INNER JOIN livros
            ON emprestimos.livro_id = livros.id
            ORDER BY emprestimos.id`
        )

        return resultado.rows
    }

    async atualizarDevolucao(id: number, dataDevolucao: Date): Promise<void> {
        await pool.query(
            `UPDATE emprestimos
            SET data_devolucao = $1
            WHERE id = $2`, [dataDevolucao, id]
        )
    }
}