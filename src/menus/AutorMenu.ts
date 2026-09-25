import readline from "node:readline";
import { AutorController } from "../controllers/AutorController";

export class AutorMenu {
    private autorController: AutorController;
    private rl: readline.Interface

    constructor() {
        this.autorController = new AutorController();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    private perguntar(pergunta: string): Promise<string>{
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => {
                resolve(resposta)
            })
        })
    }

    private exibirMenu(): void {
    console.log("\n===== AUTORES =====");
    console.log("1 - Cadastrar autor");
    console.log("2 - Listar autores");
    console.log("3 - Buscar autor por ID");
    console.log("4 - Atualizar autor");
    console.log("5 - Excluir autor");
    console.log("0 - Voltar");
    }

    async iniciar(): Promise<void>{
        let executando = true

        while (executando) {
            this.exibirMenu();

            const opcao = await this.perguntar("Escolha uma opção:");

            switch (opcao) {
                case "0":
                    executando = false;
                    break;

                default:
                    console.log("Opção inválida.")
            }
        }
    }
}