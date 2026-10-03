import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { validarNome } from "../utils/validacoes";

export class ClienteService {
     private clienteRepository: ClienteRepository;

     constructor(){
        this.clienteRepository = new ClienteRepository();
     }

     async criar(nome: string, email: string |null): Promise<Cliente>{
        validarNome(nome);

        if (email !== null && !email.trim()) {
            email = null;
        }

        return await this.clienteRepository.criar(
            nome.trim(),
            email?.trim() || null
        )
     }

     async listar(): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.listar();

        if (clientes.length === 0){
            throw new Error("Nenhum cliente cadastrado.");
        }

        return clientes
     }

     async buscarPorId(id: number): Promise<Cliente>{
        const cliente = await this.clienteRepository.buscarPorId(id);

        if (cliente === null){
            throw new Error("Cliente não encontrado.");
        }

        return cliente
     }

     async atualizar(id: number, nome: string, email: string | null): Promise<void>{
        validarNome(nome);

        const cliente = await this.clienteRepository.buscarPorId(id);

        if (cliente === null){
            throw new Error("Cliente não encontrado.");
        }

        if (email !== null && !email.trim()) {
            email = null
        }

        await this.clienteRepository.atualizar(
            id,
            nome.trim(),
            email?.trim() || null
        )
     }

     async excluir(id: number): Promise<void>{
        const cliente = await this.clienteRepository.buscarPorId(id);

        if (cliente === null){
            throw new Error("Cliente não encontrado.");
        }

        await this.clienteRepository.excluir(id);
     }
}