import { AutorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";

export class AutorService {
    private autorRepository: AutorRepository

    constructor() {
        this.autorRepository = new AutorRepository()
    }

    async criar(nome: string): Promise<Autor> {
        if (!nome.trim()){
            throw new Error("O nome do autor é obrigatório!")
        }

        return await this.autorRepository.criar(nome.trim())
    }

    async listar(): Promise<Autor[]> {
        return await this.autorRepository.listar()
    }

    async buscarPorId(id: number): Promise<Autor> {
        const autor = await this.autorRepository.buscarPorId(id)

        if(autor === null){
            throw new Error("Autor não encontrado.")
        }

        return autor
    }

    async atualizar(id: number, nome: string): Promise<void> {
        if(!nome.trim()){
            throw new Error("O nome do autor é obrigatório.")
        }

        const autor = await this.autorRepository.buscarPorId(id)

        if(autor === null) {
            throw new Error("Autor não encontrado.")
        }

        await this.autorRepository.atualizar(id, nome.trim())
    }

    async excluir(id: number): Promise<void> {
        const autor = await this.autorRepository.buscarPorId(id)

        if(autor === null) {
            throw new Error("Autor não encontrado.")
        }

        await this.autorRepository.excluir(id)
    }
}