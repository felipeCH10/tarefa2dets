"use strict";
const criarAluno = () => {
    return {
        id: null,
        nome: null,
        telefone: []
    };
};
const main = () => {
    const aluno = criarAluno();
    const sala = [];
    for (let index = 0; index < 3; index++) {
        aluno.id = index;
        aluno.nome = "Nome: " + index;
        sala.push(aluno);
    }
    console.log(sala);
};
main();
