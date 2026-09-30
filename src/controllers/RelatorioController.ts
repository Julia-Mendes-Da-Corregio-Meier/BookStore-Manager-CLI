import { RelatorioService } from "../services/RelatorioService";

export class RelatorioController{
    private relatorioService: RelatorioService;

    constructor(){
        this.relatorioService = new RelatorioService();
    }

    async livrosDisponiveis(): Promise<any[]> {
        return await this.relatorioService.livrosDisponiveis();
    }

    async livrosEmprestados(): Promise<any[]> {
        return await this.relatorioService.livrosEmprestados();
    }

    async livrosPorAutor(): Promise<any[]> {
        return await this.relatorioService.livrosPorAutor();
    }

    async emprestimosPorLivro(): Promise<any[]> {
        return await this.relatorioService.emprestimosPorLivro();
    }

    async clientesComEmprestimosAtivos(): Promise<any[]>{
        return await this.relatorioService.clientesComEmprestimosAtivos();
    }
}