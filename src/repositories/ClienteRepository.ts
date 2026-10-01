import pool from "../database/connection";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    async criar(nome: string, email: string | null): Promise<Cliente> {

        const resultado = await pool.query(
            `INSERT INTO clientes (nome, email)
            VALUES ($1, $2)
            RETURNING id, nome, email`, [nome, email]
        )

        const cliente = resultado.rows[0];

        return new Cliente(
            cliente.id,
            cliente.nome,
            cliente.email
        )
    }

    async listar(): Promise<Cliente[]> {
        const resultado = await pool.query(
            `SELECT id, nome, email
            FROM clientes
            ORDER BY id`
        )

        return resultado.rows.map(
            (cliente) =>
                new Cliente(
                    cliente.id,
                    cliente.nome,
                    cliente.email
                )
            )
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        const resultado = await pool.query(
            `SELECT id, nome, email
            FROM clientes
            WHERE id = $1`,[id]
        )

        if(resultado.rows.length === 0){
            return null
        }

        const cliente = resultado.rows[0]

        return new Cliente(
            cliente.id,
            cliente.nome,
            cliente.email
        )
    }

    async atualizar(id: number, nome: string, email: string | null): Promise<void> {
        await pool.query(
            `UPDATE clientes
            SET nome = $1, email = $2
            WHERE id = $3`,[nome, email, id]
        )
    }

    async excluir(id: number):Promise<void>{
        await pool.query(
            `DELETE FROM clientes
            WHERE id = $1`, [id]
        )
    }
}