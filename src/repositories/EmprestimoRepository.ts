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
}