import { Pessoa } from "../tipos/tipos";

const criarPessoa = (): Pessoa => {
    const pessoa: Pessoa = {
        id: null,
        nome: null,
        idade: null,
        telefone: [],
        endereco: []
    }

    return pessoa;
}

const sala: Pessoa[] = [];

for (let index = 0; index < 2; index++) {
    const pessoa: Pessoa = criarPessoa();

    pessoa.id = Number(prompt("Informe o ID: "));
    pessoa.nome = prompt("Informe o nome: ");
    pessoa.idade = Number(prompt("Informe a idade: "));

    sala.push(pessoa);
}

console.log(sala);
