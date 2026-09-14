type Telefone = {
    ddd: string,
    numero: string
}

type Endereco = {
    logradouro: string,
    numero: string,
    cidade: string,
    identificador: string
}

export type Pessoa = {
    id: number|null,
    nome: string|null,
    idade: number|null,
    telefone: Telefone[],
    endereco: Endereco[]
}