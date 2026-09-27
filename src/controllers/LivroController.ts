import { Livro } from "../models/Livro";
import { LivroService } from "../services/LivroService";

export class LivroController {
    private livroService: LivroService

    constructor(){
        this.livroService = new LivroService()
    }

    async criar(
        titulo: string,
        anoPublicacao: number | null,
        quantidade: number,
        autorId: number
    ): Promise<Livro> {
        return await this.livroService.criar(
            titulo, anoPublicacao, quantidade, autorId
        )
    }

    async listar(): Promise<Livro[]>{
        return await this.livroService.listar()
    }

    async buscarPorId(id: number): Promise<Livro>{
        return await this.livroService.buscarPorId(id)
    }

    async buscarPorAutor(autorId: number): Promise<Livro[]>{
        return await this.livroService.buscarPorAutor(autorId)
    }

    async atualizarTitulo(id: number, titulo: string): Promise<void>{
        await this.livroService.atualizarTitulo(id, titulo);
    }

    async atualizarAno(id: number, anoPublicacao: number): Promise<void>{
        await this.livroService.atualizarAno(id, anoPublicacao);
    }

    async atualizarQuantidade(id: number, quantidade: number): Promise<void>{
        await this.livroService.atualizarQuantidade(id, quantidade);
    }

    async atualizarAutor(id: number, autorId: number): Promise<void>{
        await this.livroService.atualizarAutor(id, autorId);
    }

    async excluir(id: number): Promise<void>{
        await this.livroService.excluir(id);
    }
}