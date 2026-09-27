export class Livro {
    constructor (
        public id: number,
        public titulo: string,
        public anoPublicacao: number | null,
        public quantidade: number,
        public autorId: number
    ) {}
}