import "dotenv/config";
import pg from "pg";

const { Client } = pg;

function env(nome: string, padrao: string): string {
    const valor = process.env[nome];

    return valor === undefined || valor.trim() === ""
        ? padrao
        : valor;
}

const NOME_BANCO = env("DB_NAME", "bookstore");

async function criarBanco(): Promise<void> {
    const client = new Client({
        host: env("DB_HOST", "localhost"),
        port: Number(env("DB_PORT", "5432")),
        user: env("DB_USER", "postgres"),
        password: env("DB_PASSWORD", "postgres"),
        database: "postgres",
    });

    try{
        await client.connect();

        const existente = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [NOME_BANCO]
        );

        if ((existente.rowCount ?? 0) > 0) {
            console.log(
                `O banco "${NOME_BANCO}" já existe. Nada a fazer.`
            );
            return;
        }

        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(NOME_BANCO)) {
            console.error(
                `Nome de banco inválido: "${NOME_BANCO}".`
            );

            process.exitCode = 1;
            return;
        }

        await client.query(`CREATE DATABASE "${NOME_BANCO}"`);

        console.log(
            `Banco "${NOME_BANCO}" criado com sucesso!`
        );

    } catch (erro){
        const detalhe =
            erro instanceof Error
                ? erro.message
                : String(erro);

        console.error(
            `Não foi possível criar o banco: ${detalhe}`
        );

        process.exitCode = 1;
    } finally {
        await client.end().catch(() => undefined);
    }
}

criarBanco();