import pool from "../database/connection";
import { Autor } from "../models/Autor";

export class AutorRepository {
    
    async criar(nome: string): Promise<Autor> {
        const resultado = await pool.query(
            "INSERT INTO autores (nome) VALUES ($1) RETURNING id,nome",
            [nome]
        )

        const autor = resultado.rows[0]

        return new Autor(autor.id, autor.nome)
    }

    async listar(): Promise<Autor[]> {
        const resultado = await pool.query(
            "SELECT id, nome FROM autores ORDER BY id"
        );

        return resultado.rows.map(
            (autor) => new Autor(autor.id, autor.nome)
        )
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        const resultado = await pool.query(
            "SELECT id, FROM autores WHERE id = $1",
            [id]
        );

        if(resultado.rows.length === 0){
            return null
        }

        const autor = resultado.rows[0];

        return new Autor(autor.id, autor.nome)
    }

    async atualizar(id: number, nome: string): Promise<void> {
        await pool.query(
            "UPDATE autores SET nome = $1 WHERE id = $2",
            [nome,id]
        )
    }

    async excluir(id:number): Promise<void> {
        await pool.query(
            "DELETE FROM autores WHERE id = $1",
            [id]
        )
    }
}

