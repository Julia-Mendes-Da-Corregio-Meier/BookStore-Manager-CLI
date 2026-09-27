import pool from "../database/connection";
import { Livro } from "../models/Livro";

export class LivroRepository {
    async criar(
        titulo: string,
        anoPublicacao: number | null,
        quantidade: number,
        autorId: number
    ): Promise<Livro> {
        const resultado = await pool.query(
            `INSERT INTO livros
            (titulo, ano_publicacao, quantidade, autor_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, titulo, ano_publicacao, quantidade, autor_id`,
            [titulo, anoPublicacao, quantidade, autorId]
        );

        const livro = resultado.rows[0]

        return new Livro (
            livro.id,
            livro.titulo,
            livro.ano_publicacao,
            livro.quantidade,
            livro.autor_id
        );
    }

    async listar(): Promise<Livro[]> {
        const resultado = await pool.query(
            `SELECT id, titulo, ano_publicacao, quantidade, autor_id
            FROM livros 
            ORDER BY id`
        );

        return resultado.rows.map(
            (livro) => new Livro(
                livro.id,
                livro.titulo,
                livro.ano_publicacao,
                livro.quantidade,
                livro.autor_id
            )
        )
    }

    async buscarPorId (id: number): Promise<Livro | null> {
        const resultado = await pool.query(
            `SELECT id, titulo, ano_publicacao, quantidade, autor_id
         FROM livros
         WHERE id = $1 `,
         [id]
        );

        if(resultado.rows.length === 0){
            return null
        }

        const livro = resultado.rows[0];

        return new Livro(
            livro.id,
            livro.titulo,
            livro.ano_publicacao,
            livro.quantidade,
            livro.autor_id
        )
    }

    async buscarPorAutor(autorId: number): Promise<Livro[]> {
         const resultado = await pool.query(
            `SELECT
                livros.id,
                livros.titulo,
                livros.ano_publicacao,
                livros.quantidade,
                livros.autor_id
             FROM livros
             INNER JOIN autores
                 ON livros.autor_id = autores.id
             WHERE autores.id = $1
             ORDER BY livros.id`,
            [autorId]
        );

        return resultado.rows.map(
            (livro) => new Livro(
                 livro.id,
                 livro.titulo,
                 livro.ano_publicacao,
                 livro.quantidade,
                 livro.autor_id
            )
        )
    }

    async atualizarTitulo(id: number, titulo: string): Promise<void> {
    await pool.query(
        `UPDATE livros
         SET titulo = $1
         WHERE id = $2`,
        [titulo, id]
    );
  } 

    async atualizarAno(
    id: number,
    anoPublicacao: number | null
     ): Promise<void> {

    await pool.query(
        `UPDATE livros
         SET ano_publicacao = $1
         WHERE id = $2`,
        [anoPublicacao, id]
    );
    }

    async atualizarQuantidade(
        id: number,
        quantidade: number,
    ): Promise<void> {

        await pool.query(
            `UPDATE livros
            SET quantidade = $1
            WHERE id = $2`,
            [quantidade, id]
        )
    }

    async atualizarAutor(
        id: number,
        autorId: number
    ): Promise<void> {

        await pool.query(
            `UPDATE livros
            SET autor_id = $1
            WHERE id = $2`,
            [autorId, id]
        )
    }

    async excluir(id: number): Promise<void> {
        await pool.query(
            `DELETE FROM livros
            WHERE id = $1`,
            [id]
        )
    }
}