import readline from "node:readline";
import { ClienteController } from "../controllers/ClienteController";

export class ClienteMenu{
    private clienteController: ClienteController;
    private rl: readline.Interface;

    constructor(){
        this.clienteController = new ClienteController();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    private perguntar (pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => {
                resolve(resposta);
            })
        })
    }

    private exibirMenu(): void {
        console.log("\n===== CLIENTES =====");
        console.log("1 - Cadastrar cliente");
        console.log("2 - Listar clientes");
        console.log("3 - Buscar cliente por ID");
        console.log("4 - Atualizar cliente");
        console.log("5 - Excluir cliente");
        console.log("0 - Voltar");
    }

    async iniciar(): Promise<void> {
         let executando = true;

         while (executando) {
            this.exibirMenu();

            const opcao = await this.perguntar("Escolha uma opção: ");

            switch (opcao) {
                case "0":
                    executando = false;
                    break;

                case "1": {
                    try {
                        const nome = await this.perguntar(
                            "Digite o nome do cliente: "
                        )

                        const emailResposta = await this.perguntar(
                            "Digite o e-mail do cliente (ou deixe vazio): "
                        )

                        const email = emailResposta.trim()
                           ? emailResposta : null;

                        const cliente = await this.clienteController.criar(
                            nome, email
                        )

                        console.log("\nCliente criado com sucesso!")
                        console.log(`ID: ${cliente.id}`)
                        console.log(`Nome: ${cliente.nome}`)
                        console.log(`E-mail: ${cliente.email ?? "Não informado"}`)

                    } catch (erro){
                        console.log((erro as Error).message);
                    }

                    break;
                }


                case "2": {
                    try {
                        const clientes = await this.clienteController.listar();

                        console.log("\n===== CLIENTES CADASTRADOS =====");

                        clientes.forEach((cliente) => {
                            console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email ?? "Não informado"}`)
                        })
                    } catch (erro) {
                        console.log((erro as Error).message)
                    }

                    break
                }


                case "3": {
                    try {
                        const id = Number(await this.perguntar("Digite o ID do cliente: "))

                        const cliente = await this.clienteController.buscarPorId(id);

                        console.log("\n===== CLIENTE ENCONTRADO =====")
                        console.log(`ID: ${cliente.id}`)
                        console.log(`Nome: ${cliente.nome}`)
                        console.log(`E-mail: ${cliente.email ?? "Não informado"}`)

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break;
                }


                case "4": {
                    try{
                        const id = Number(await this.perguntar("Digite o ID do cliente que deseja atualizar: "))

                         await this.clienteController.buscarPorId(id);

                         const nome = await this.perguntar("Digite o novo nome: ")

                         const emailResposta = await this.perguntar("Digite o novo e-mail (ou deixe vazio): ")

                         const email = emailResposta.trim()
                            ? emailResposta : null;

                        await this.clienteController.atualizar(id, nome, email)

                        console.log("Cliente atualizado com sucesso!")

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break;
                }

                case "5": {
                    try{
                        const id = Number(await this.perguntar("Digite o ID do cliente que deseja excluir: "))

                        await this.clienteController.excluir(id);

                        console.log("Cliente excluído com sucesso!")

                    } catch (erro) {
                        console.log((erro as Error).message);
                    }

                    break;
                }

                default: console.log("Opção inválida.");
            }
         }
    }
}