import { AutorService } from "../services/AutorService";
import { Autor } from "../models/Autor";

export class AutorController {
    private autorService: AutorService

    constructor(){
        this.autorService = new AutorService()
    }

    async criar(nome: string): Promise<Autor> {
        return await this.autorService.criar(nome)
    }

    async listar(): Promise<Autor[]> {
        return await this.autorService.listar()
    }

    async buscaPorId(id: number): Promise<Autor> {
        return await this.autorService.buscarPorId(id)
    }

    async atualizar(id: number, nome: string): Promise<void>{
        await this.autorService.atualizar(id, nome)
    }

    async excluir(id: number): Promise<void>{
        await this.autorService.excluir(id)
    }
}