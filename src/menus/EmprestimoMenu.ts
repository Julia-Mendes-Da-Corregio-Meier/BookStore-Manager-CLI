import readline from "node:readline";
import { EmprestimoController } from "../controllers/EmprestimoController";

export class EmprestimoMenu {
    private emprestimoController: EmprestimoController;
    private rl: readline.Interface;

    constructor() {
        this.emprestimoController = new EmprestimoController();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }

    private exibirMenu(): void {
        console.log("\n===== EMPRÉSTIMOS =====");
        console.log("1 - Realizar empréstimo");
        console.log("2 - Listar empréstimos");
        console.log("3 - Buscar empréstimo por ID");
        console.log("4 - Listar empréstimos com detalhes");
        console.log("5 - Registrar devolução");
        console.log("0 - Voltar");
    }

    async iniciar(): Promise<void> {
        let executando = true;

        while(executando) {
            this.exibirMenu()

            const opcao = await this.perguntar("Escolha uma opção: ");

            switch (opcao){
                case "0": 
                   executando = false
                   break

                case "1": {
                    try{
                        const livroId = Number(await this.perguntar("Digite o Id do livro: "))

                        const clienteId = Number(await this.perguntar("Digite o Id do cliente: "))

                        const emprestimo = await this.emprestimoController.criar(
                                livroId,
                                clienteId
                            );

                        console.log("\nEmpréstimo realizado com sucesso!");
                        console.log(`ID: ${emprestimo.id}`);
                        console.log(`ID do livro: ${emprestimo.livroId}`);
                        console.log(`ID do cliente: ${emprestimo.clienteId}`);
                        console.log(
                            `Data do empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString()}`
                        );
                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "2": {
                    try{
                        const emprestimos = await this.emprestimoController.listar();

                        console.log("\n===== EMPRÉSTIMOS CADASTRADOS =====");

                        emprestimos.forEach((emprestimo) => {
                            console.log(
                                `ID: ${emprestimo.id} | Livro ID: ${emprestimo.livroId} | Cliente ID: ${emprestimo.clienteId} | Empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString()} | Devolução: ${emprestimo.dataDevolucao?.toLocaleDateString() ?? "Em aberto"}`
                            );
                        });

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "3": {
                    try{
                        const id = Number(await this.perguntar("Digite o ID do emprestimo: "))

                        const emprestimo = await this.emprestimoController.buscarPorId(id);

                        console.log("\n===== EMPRÉSTIMO ENCONTRADO =====");
                        console.log(`ID: ${emprestimo.id}`);
                        console.log(`ID do livro: ${emprestimo.livroId}`);
                        console.log(`ID do cliente: ${emprestimo.clienteId}`);
                        console.log(`Data do empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString()}`);
                        console.log(`Data da devolução: ${emprestimo.dataDevolucao?.toLocaleDateString() ?? "Em aberto"}`);

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "4": {
                    try{
                        const emprestimos = await this.emprestimoController.listarComDetalhes();

                        console.log("\n===== EMPRÉSTIMOS COM DETALHES =====");

                        emprestimos.forEach((emprestimo) => {
                            console.log(
                                `ID: ${emprestimo.id} | Cliente: ${emprestimo.cliente} | Livro: ${emprestimo.livro} | Empréstimo: ${new Date(emprestimo.data_emprestimo).toLocaleDateString()} | Devolução: ${emprestimo.data_devolucao ? new Date(emprestimo.data_devolucao).toLocaleDateString() : "Em aberto"}`
                            );
                        });

                    } catch(erro) {
                        console.log((erro as Error).message);
                    }

                    break
                }


                case "5": {
                    try {
                        const id = Number(await this.perguntar("Digite o ID do empréstimo que deseja devolver: "))

                        await this.emprestimoController.devolver(id);

                        console.log("Livro devolvido com sucesso!");

                    } catch(erro) {
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