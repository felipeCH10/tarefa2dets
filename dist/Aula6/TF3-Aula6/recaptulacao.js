"use strict";
const salaDeAula = [];
for (let index = 0; index < 3; index++) {
    salaDeAula.push({
        nome: "Aluno " + index,
        idade: index + 10,
        cpf: "111111111111" + index,
        alturaMetro: 10 * index,
        pesoKG: 11 * index
    });
}
console.log(salaDeAula);
