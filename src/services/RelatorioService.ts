import { RelatorioRepository } from "../repositories/RelatorioRepository";

export class RelatorioService {
   private relatorioRepository: RelatorioRepository;
   
   constructor() {
        this.relatorioRepository = new RelatorioRepository();
    }

    async livrosDisponiveis(): Promise<any[]> {
        return await this.relatorioRepository.livrosDisponiveis();
    }

    async livrosEmprestados(): Promise<any[]> {
        return await this.relatorioRepository.livrosEmprestados();
    }

    async livrosPorAutor(): Promise<any[]> {
        return await this.relatorioRepository.livrosPorAutor();
    }

    async emprestimosPorLivro(): Promise<any[]> {
        return await this.relatorioRepository.emprestimosPorLivro();
    }

    async clientesComEmprestimosAtivos(): Promise<any[]> {
        return await this.relatorioRepository.clientesComEmprestimosAtivos();
    }
}