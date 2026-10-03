export function validarNome(nome: string): void {
    if (!nome.trim()) {
        throw new Error("O nome é obrigatório.");
    }

    if (/\d/.test(nome)) {
        throw new Error("O nome não pode conter números.");
    }
}