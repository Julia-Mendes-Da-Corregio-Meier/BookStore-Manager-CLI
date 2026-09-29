import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoService } from "../services/EmprestimoService";

export class EmprestimoController {
    private emprestimoService: EmprestimoService

    constructor(){
        this.emprestimoService = new EmprestimoService();
    }

    async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
        return await this.emprestimoService.criar(livroId, clienteId)
    }

    async listar(): Promise<Emprestimo[]> {
        return await this.emprestimoService.listar();
    }

    async buscarPorId(id: number): Promise<Emprestimo> {
        return await this.emprestimoService.buscarPorId(id);
    }

    async listarComDetalhes(): Promise<any[]> {
        return await this.emprestimoService.listarComDetalhes();
    }

    async devolver(id: number): Promise<void> {
        await this.emprestimoService.devolver(id);
    }
}