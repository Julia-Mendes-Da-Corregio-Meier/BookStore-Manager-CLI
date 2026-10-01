import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorRepository } from "../repositories/AutorRepository";

export class LivroService {
    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor() {
        this.livroRepository = new LivroRepository();
        this.autorRepository = new AutorRepository();
    }

    async criar(
        titulo: string,
        anoPublicacao: number | null,
        quantidade: number,
        autorId: number
    ): Promise<Livro> {
        
        if(!titulo.trim()) {
            throw new Error("O título do livro é obrigatório.")
        }

        if(quantidade < 0){
            throw new Error("A quantidade não pode ser negativa.")
        }

        const autor = await this.autorRepository.buscarPorId(autorId)

        if (autor === null) {
            throw new Error("Autor não encontrado.")
        }

        return await this.livroRepository.criar(
            titulo.trim(),
            anoPublicacao,
            quantidade,
            autorId
        )
    }

    async listar(): Promise<Livro[]> {
        const livros = await this.livroRepository.listar()

        if(livros.length === 0){
            throw new Error("Nenhum livro cadastrado.")
        }

        return livros
    }

    async buscarPorId(id: number): Promise<Livro> {
        const livro = await this.livroRepository.buscarPorId(id)

        if(livro === null) {
            throw new Error("Livro não encontrado.")
        }

        return livro
    }

    async buscarPorAutor(autorId: number): Promise<Livro[]> {
        const autor = await this.autorRepository.buscarPorId(autorId)

        if(autor === null){
            throw new Error("Autor não encontrado.")
        }

        const livros = await this.livroRepository.buscarPorAutor(autorId)

        if(livros.length === 0){
            throw new Error("Esse autor não possui livros cadastrados.")
        }

        return livros
    }

    async atualizarTitulo(id: number, titulo: string): Promise<void> {
        if(!titulo.trim()){
            throw new Error("O título do livro é obrigatório.")
        }

        const livro = await this.livroRepository.buscarPorId(id)

        if(livro === null){
            throw new Error("Livro não encontrado.")
        }

        await this.livroRepository.atualizarTitulo(id, titulo.trim())
    }

    async atualizarAno(id: number, anoPublicacao: number | null): Promise<void>{
         const livro = await this.livroRepository.buscarPorId(id)

         if(livro === null){
            throw new Error("Livro não encontrado.")
           }

           await this.livroRepository.atualizarAno(id, anoPublicacao)
        }

    async atualizarQuantidade(id: number, quantidade: number): Promise<void> {
        if(quantidade < 0) {
            throw new Error("A quantidade não pode ser negativa.")
        }

        const livro = await this.livroRepository.buscarPorId(id)

        if(livro === null){
            throw new Error ("Livro não encontrado.")
        }

        await this.livroRepository.atualizarQuantidade(id, quantidade)
    }

    async atualizarAutor(id: number, autorId: number): Promise<void>{
        const livro = await this.livroRepository.buscarPorId(id)

        if(livro === null){
            throw new Error("Livro não encontrado.")
        }

        const autor = await this.autorRepository.buscarPorId(autorId)

        if (autor === null) {
        throw new Error("Autor não encontrado.")
        }

        await this.livroRepository.atualizarAutor(id, autorId)
    }

    async excluir(id: number): Promise<void> {
        const livro = await this.livroRepository.buscarPorId(id)

        if(livro === null){
            throw new Error("Livro não encontrado.")
        }

        await this.livroRepository.excluir(id)
    }


}