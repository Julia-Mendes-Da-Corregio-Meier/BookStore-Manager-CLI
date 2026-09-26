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
                case "1":
                   try{ const nome = await this.perguntar("Digite o nome do autor: ");
                    const autor = await this.autorController.criar(nome);
                    
                    console.log("Autor criado com sucesso!");
                    console.log(`ID: ${autor.id}`);
                    console.log(`Nome: ${autor.nome}`)
                   }catch (erro){
                    console.log((erro as Error).message)
                   }
                   
                    break

                case "2": {
                    const autores = await this.autorController.listar()

                    console.log("\n===== AUTORES CADASTRADOS =====")

                    autores.forEach((autor) => {
                        console.log(`ID: ${autor.id} | Nome: ${autor.nome}`)
                    })
                break;    
                }
                

                case "3": {
                   try {
                    const id = Number(
                        await this.perguntar("Digite o ID do autor: ")
                    )

                    const autor = await this.autorController.buscaPorId(id)

                    console.log("\n===== AUTOR ENCONTRADO =====");
                    console.log(`ID: ${autor.id}`)
                    console.log(`Nome: ${autor.nome}`)
                } catch (erro) {
                    console.log((erro as Error).message)
                }

                    break
                }

                case "4": {
                    try {
                        const id = Number(
                        await this.perguntar("Digite o ID do autor que deseja atualizar: ")
                    )
                    const autor = await this.autorController.buscaPorId(id)
                   
                    const nome = await this.perguntar("Digite o novo nome do autor: ")

                    await this.autorController.atualizar(id, nome)

                    console.log("Autor atualizado com sucesso!")
                } catch (erro) {
                    console.log((erro as Error).message)
                }

                    break
                }

                case "5": {
                    try {const id = Number(
                        await this.perguntar("Digite o ID dp autor que desejá excuir: ")
                    )

                    await this.autorController.excluir(id)

                    console.log("Autor excluído com sucesso!")
                }catch (erro){
                    console.log((erro as Error).message)
                }

                    break
                }


                default:
                    console.log("Opção inválida.")
            }
        }
    }
}