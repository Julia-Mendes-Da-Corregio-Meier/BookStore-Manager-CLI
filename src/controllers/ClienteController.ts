import { Cliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";

export class ClienteController{
    private clienteService: ClienteService;

    constructor(){
        this.clienteService = new ClienteService();
    }

    async criar(nome: string, email: string | null): Promise<Cliente>{
        return await this.clienteService.criar(nome, email);
    }

    async listar(): Promise<Cliente[]> {
        return await this.clienteService.listar();
    }

    async buscarPorId(id: number): Promise<Cliente>{
        return await this.clienteService.buscarPorId(id);
    }

    async atualizar(id: number, nome: string, email: string | null):Promise<void>{
        await this.clienteService.atualizar(id, nome, email)
    }

    async excluir(id: number): Promise<void>{
        await this.clienteService.excluir(id);
    }
}