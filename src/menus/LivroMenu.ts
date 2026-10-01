import readline from "node:readline";
import { LivroController } from "../controllers/LivroController";

export class LivroMenu {
    private livroController: LivroController;
    private rl: readline.Interface;

    constructor(rl: readline.Interface) {
        this.livroController = new LivroController();

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
       console.log("\n===== LIVROS =====");
       console.log("1 - Cadastrar livro");
       console.log("2 - Listar livros");
       console.log("3 - Buscar livro por ID");
       console.log("4 - Buscar livros por autor");
       console.log("5 - Atualizar livro");
       console.log("6 - Excluir livro");
       console.log("0 - Voltar");
    }

    async iniciar():Promise<void>{
        let executando = true;

        while (executando) {
            this.exibirMenu()

            const opcao = await this.perguntar("Escolha uma opção: ")

            switch (opcao) {
                case "0":
                    executando = false;
                    break;
                
                case "1": {
                    try{
                        const titulo = await this.perguntar("Digite o título do livro: ")

                        const anoResposta = await this.perguntar("Digite o ano de publicação (ou deixe vazio): ")

                        const anoPublicacao = anoResposta.trim()
                            ? Number(anoResposta) : null;

                        const quantidade = Number(
                            await this.perguntar("Digite a quantidade de exemplares: ")
                        )

                        const autorId = Number(
                            await this.perguntar("Digite o ID do autor: ")
                        )

                        const livro = await this.livroController.criar(
                            titulo,
                            anoPublicacao,
                            quantidade,
                            autorId
                        )

                        console.log("\nLivro criado com sucesso!")
                        console.log(`ID: ${livro.id}`)
                        console.log(`Título: ${livro.titulo}`)
                        console.log(`Ano de publicação: ${livro.anoPublicacao ?? "Não informado"}`)
                        console.log(`Quantidade: ${livro.quantidade}`)
                        console.log(`ID do autor: ${livro.autorId}`)

                    }catch (erro){
                        console.log((erro as Error).message)
                    }

                    break;
                }

                case "2": {
                    try{
                        const livros = await this.livroController.listar()

                        console.log("\n===== LIVROS CADASTRADOS =====")

                        livros.forEach((livro) => {
                            console.log(
                                `ID: ${livro.id} | Título: ${livro.titulo} | Ano: ${livro.anoPublicacao ?? "Não informado"} | Quantidade: ${livro.quantidade} | Autor ID: ${livro.autorId}`
                            )
                        })
                    } catch (erro) {
                        console.log((erro as Error).message)
                    }

                    break;
                }

                case "3": {
                    try {
                        const id = Number (
                            await this.perguntar("Digite o Id do livro: ")
                        )

                        const livro = await this.livroController.buscarPorId(id)

                        console.log("\n===== LIVRO ENCONTRADO =====")
                        console.log(`ID: ${livro.id}`);
                        console.log(`Título: ${livro.titulo}`);
                        console.log(
                           `Ano de publicação: ${livro.anoPublicacao ?? "Não informado"}`
                        );
                        console.log(`Quantidade: ${livro.quantidade}`);
                        console.log(`ID do autor: ${livro.autorId}`);
                    } catch (erro) {
                        console.log((erro as Error).message)
                    }

                    break;
                }

                case "4": {
                    try {
                        const autorId = Number(
                            await this.perguntar("Digite o ID do autor: ")
                        )

                        const livros = await this.livroController.buscarPorAutor(autorId)

                        console.log("\n===== LIVROS DO AUTOR =====")

                        livros.forEach((livro) => {
                            console.log(
                                `ID: ${livro.id} | Título: ${livro.titulo} | Ano: ${livro.anoPublicacao ?? "Não informado"} | Quantidade: ${livro.quantidade}`
                            )
                        })
                    } catch (erro){
                        console.log((erro as Error).message)
                    }

                    break;
                
                }

                case "5": {
                    try{
                        const id = Number(
                            await this.perguntar("Digite o ID do livro que deseja atualizar: ")
                        )

                        await this.livroController.buscarPorId(id)

                        let atualizando = true

                        while (atualizando){
                            console.log("\n===== ATUALIZAR LIVRO =====");
                            console.log("1 - Alterar título");
                            console.log("2 - Alterar ano de publicação");
                            console.log("3 - Alterar quantidade");
                            console.log("4 - Alterar autor");
                            console.log("0 - Voltar");

                            const opcao = await this.perguntar("Escolha uma opção: ")

                            switch(opcao) {
                                case "1": {
                                    const titulo = await this.perguntar(
                                        "Digite o novo título: "
                                    )

                                    await this.livroController.atualizarTitulo(id, titulo)

                                    console.log("Título atualizado com sucesso!")

                                    break;
                                }

                                case "2": {
                                    const anoResposta = await this.perguntar(
                                        "Digite o novo ano de publicação (ou deixe vazio): "
                                    )

                                    const anoPublicacao = anoResposta.trim()
                                        ? Number(anoResposta) : null;

                                    await this.livroController.atualizarAno(
                                        id,
                                        anoPublicacao
                                    )

                                    console.log("Ano de publicação atualizado com sucesso!");

                                    break;
                                }

                                case "3": {
                                    const quantidade = Number(
                                        await this.perguntar(
                                            "Digite a nova quantidade: "
                                        )
                                    )

                                    await this.livroController.atualizarQuantidade(
                                        id,
                                        quantidade
                                    )

                                    console.log("Quantidade atualizada com sucesso!");
                                    break;
                                }

                                case "4": {
                                    try{
                                    const autorId = Number(
                                        await this.perguntar(
                                            "Digite o novo ID do autor: "
                                        )
                                    )

                                    await this.livroController.atualizarAutor(
                                        id,
                                        autorId
                                    )

                                    console.log("Autor atualizado com sucesso!");

                                   } catch (erro) {
                                       if(erro instanceof Error){
                                        console.log(`Erro: ${erro.message}`)
                                       } else {
                                        console.log("Ocorreu um erro inesperado.")
                                       }
                                   }

                                   break;
                                }

                                case "0":
                                    atualizando = false
                                    break;

                                default:
                                    console.log("Opção inválida>")
                            }
                        }
                    } catch (erro){
                        console.log((erro as Error).message)
                    }
                    break
                }

                case "6": {
                    try {
                        const id = Number(
                            await this.perguntar("Digite o ID do livro que deseja excluir: ")
                        )

                        await this.livroController.excluir(id)

                        console.log("Livro excluido com sucesso!")
                    }catch (erro){
                        console.log((erro as Error).message);
                    }

                    break
                }

                default:
                    console.log("Opção inválida.")
            }
        }
    }
}