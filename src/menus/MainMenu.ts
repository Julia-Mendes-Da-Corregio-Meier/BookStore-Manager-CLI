import readline from "node:readline";
import { AutorMenu } from "./AutorMenu";
import { LivroMenu } from "./LivroMenu";
import { ClienteMenu } from "./ClienteMenu";
import { EmprestimoMenu } from "./EmprestimoMenu";
import { RelatorioMenu } from "./RelatorioMenu";

export class MainMenu {
    private rl: readline.Interface;
    private autorMenu: AutorMenu;
    private livroMenu: LivroMenu;
    private clienteMenu: ClienteMenu;
    private emprestimoMenu: EmprestimoMenu;
    private relatorioMenu: RelatorioMenu;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.autorMenu = new AutorMenu(this.rl);
        this.livroMenu = new LivroMenu(this.rl);
        this.clienteMenu = new ClienteMenu(this.rl);
        this.emprestimoMenu = new EmprestimoMenu(this.rl);
        this.relatorioMenu = new RelatorioMenu(this.rl);
    }

    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }

    private exibirMenu(): void {
        console.log("\n===== BOOKSTORE MANAGER =====");
        console.log("1 - Autores");
        console.log("2 - Livros");
        console.log("3 - Clientes");
        console.log("4 - Empréstimos");
        console.log("5 - Relatórios");
        console.log("0 - Encerrar");
    }

    async iniciar(): Promise<void> {
        let executando = true;

        while (executando) {
            this.exibirMenu()

            const opcao = await this.perguntar("Escolha uma opcao: ")

            switch (opcao) {
                case "1": 
                   await this.autorMenu.iniciar()
                   break

                case "2":
                    await this.livroMenu.iniciar()
                    break

                case "3":
                    await this.clienteMenu.iniciar()
                    break

                case "4":
                    await this.emprestimoMenu.iniciar()
                    break

                case "5":
                    await this.relatorioMenu.iniciar()
                    break

                case "0":
                     executando = false
                    console.log("\nEncerrando o BookStore Manager...");
                    break

                default:
                    console.log("Opção inválida.");
                
            }
        }
        this.rl.close();
    }
}