import readline from "node:readline";
import { RelatorioController } from "../controllers/RelatorioController";

export class RelatorioMenu{
    private relatorioController: RelatorioController;
    private rl: readline.Interface;

    constructor(rl: readline.Interface) {
    this.relatorioController = new RelatorioController();
    this.rl = rl;
    }

    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }

    private exibirMenu(): void {
        console.log("\n===== RELATÓRIOS =====");
        console.log("1 - Livros disponíveis");
        console.log("2 - Livros emprestados");
        console.log("3 - Livros cadastrados por autor");
        console.log("4 - Quantidade de empréstimos por livro");
        console.log("5 - Clientes com empréstimos ativos");
        console.log("0 - Voltar");
    }

    async iniciar(): Promise<void>{
        let executando = true

        while(executando) {
            this.exibirMenu()

            const opcao = await this.perguntar("Escolha uma opção: ");

            switch (opcao) {
                case "0":
                    executando = false;
                    break;

                case "1": {
                    try{
                        const livros = await this.relatorioController.livrosDisponiveis()

                        console.log("\n===== LIVROS DISPONÍVEIS =====");

                        if(livros.length === 0){
                            console.log("Nenhum livro disponível.");
                            break
                        }

                        livros.forEach((livro) => {
                            console.log(`ID: ${livro.id} | Título: ${livro.titulo} | Autor: ${livro.autor} | Quantidade: ${livro.quantidade}`);
                        });

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "2": {
                    try{
                        const livros = await this.relatorioController.livrosEmprestados();

                        console.log("\n===== LIVROS EMPRESTADOS =====");

                        if (livros.length === 0) {
                            console.log("Nenhum livro emprestado.");
                            break;
                        }

                        livros.forEach((livro) => {
                            console.log(`Livro: ${livro.titulo} | Cliente: ${livro.cliente} | Data do empréstimo: ${new Date(livro.data_emprestimo).toLocaleDateString()}`);
                        });

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "3": {
                    try {
                        const livros = await this.relatorioController.livrosPorAutor();

                        console.log("\n===== LIVROS POR AUTOR =====");

                        if (livros.length === 0) {
                            console.log("Nenhum autor cadastrado.");
                            break;
                        }

                        livros.forEach((livro) => {
                            console.log( `Autor: ${livro.autor} | Quantidade de livros: ${livro.quantidade_livros}`);
                        });

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "4": {
                    try{
                        const livros = await this.relatorioController.emprestimosPorLivro();

                        console.log("\n===== EMPRÉSTIMOS POR LIVRO =====");

                        if (livros.length === 0) {
                            console.log("Nenhum livro cadastrado.");
                            break;
                        }

                        livros.forEach((livro) => {
                            console.log( `Livro: ${livro.titulo} | Quantidade de empréstimos: ${livro.quantidade_emprestimos}`);
                        });

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "5": {
                    try{
                        const clientes = await this.relatorioController.clientesComEmprestimosAtivos();

                        console.log("\n===== CLIENTES COM EMPRÉSTIMOS ATIVOS =====");

                        if (clientes.length === 0) {
                            console.log("Nenhum cliente possui empréstimos ativos.");
                            break;
                        }

                        clientes.forEach((cliente) => {
                            console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email ?? "Não informado"} | Empréstimos ativos: ${cliente.emprestimos_ativos}`);
                        });

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }

                default:
                    console.log("Opção inválida.");
            }
        }
    }
}