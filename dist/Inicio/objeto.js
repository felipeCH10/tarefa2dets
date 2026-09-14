"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const criarPessoa = () => {
    const pessoa = {
        id: null,
        nome: null,
        idade: null,
        telefone: [],
        endereco: []
    };
    return pessoa;
};
const sala = [];
for (let index = 0; index < 2; index++) {
    const pessoa = criarPessoa();
    pessoa.id = Number(prompt("Informe o ID: "));
    pessoa.nome = prompt("Informe o nome: ");
    pessoa.idade = Number(prompt("Informe a idade: "));
    sala.push(pessoa);
}
console.log(sala);
