import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

function env(nome: string, padrao: string): string {
    const valor = process.env[nome];

    return valor === undefined || valor.trim() === ""
        ? padrao
        : valor;
}

async function executarMigracao(): Promise<void> {
    const client = new Client({
        host: env("DB_HOST", "localhost"),
        port: Number(env("DB_PORT", "5432")),
        user: env("DB_USER", "postgres"),
        password: env("DB_PASSWORD", "postgres"),
        database: env("DB_NAME", "bookstore_manager"),
    });

    try {
        const caminhoSchema = path.resolve(
            process.cwd(),
             "src",
             "database",
             "schema.sql"
        );

        const schema = await readFile(caminhoSchema, "utf-8");

        await client.connect();

        await client.query(schema);

        console.log("Banco de dados atualizado com sucesso!");

    } catch (erro) {
        const detalhe =
            erro instanceof Error
                ? erro.message
                : String(erro);

        console.error(
            `Não foi possível executar o schema: ${detalhe}`
        );

        process.exitCode = 1;
    } finally {
        await client.end().catch(() => undefined);
    }
}

executarMigracao();