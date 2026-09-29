import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { LivroRepository } from "../repositories/LivroRepository";

export class EmprestimoService{
    private emprestimoRepository: EmprestimoRepository;
    private clienteRepository: ClienteRepository;
    private livroRepository: LivroRepository;

    constructor(){
        this.emprestimoRepository = new EmprestimoRepository();
        this.clienteRepository = new ClienteRepository();
        this.livroRepository = new LivroRepository();
    }

    async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
        
        const cliente = await this.clienteRepository.buscarPorId(clienteId);

        if (cliente === null) {
            throw new Error("Cliente não encontrado.");
        }

        const livro = await this.livroRepository.buscarPorId(livroId);

        if (livro === null) {
            throw new Error("Livro não encontrado.");
        }

        if (livro.quantidade <= 0) {
            throw new Error("Não há exemplares disponíveis desse livro.");
        }

        const dataEmprestimo = new Date();

        const emprestimo = await this.emprestimoRepository.criar(
            livroId,
            clienteId,
            dataEmprestimo
        );

        await this.livroRepository.atualizarQuantidade(
            livroId,
            livro.quantidade - 1
        );

        return emprestimo;
    }

    async listar(): Promise<Emprestimo[]>{
        const emprestimos = await this.emprestimoRepository.listar();

        if (emprestimos.length === 0){
            throw new Error("Nenhum empréstimo cadastrado.");
        }

        return emprestimos;
    }

    async buscarPorId(id: number): Promise<Emprestimo>{
        const emprestimo = await this.emprestimoRepository.buscarPorId(id);

         if (emprestimo === null) {
            throw new Error("Empréstimo não encontrado.");
        }

        return emprestimo;
    }

    async listarComDetalhes(): Promise<any[]>{
        const emprestimos = await this.emprestimoRepository.listarComDetalhes();

        if (emprestimos.length === 0) {
            throw new Error("Nenhum empréstimo cadastrado.");
        }

        return emprestimos;
    }

    async devolver(id: number): Promise<void> {
        const emprestimo = await this.emprestimoRepository.buscarPorId(id);

        if (emprestimo === null) {
            throw new Error("Empréstimo não encontrado.");
        }

        if (emprestimo.dataDevolucao !== null) {
            throw new Error("Esse empréstimo já foi devolvido.");
        }

        const livro = await this.livroRepository.buscarPorId(emprestimo.livroId);

        if (livro === null) {
            throw new Error("Livro não encontrado.");
        }

        const dataDevolucao = new Date();

        await this.emprestimoRepository.atualizarDevolucao(id, dataDevolucao);

        await this.livroRepository.atualizarQuantidade(
            livro.id,
            livro.quantidade + 1
        );
    }
}