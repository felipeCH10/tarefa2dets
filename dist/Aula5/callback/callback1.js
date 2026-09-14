"use strict";
// Função principal que recebe a callback por parâmetro
function executarOperacao(v1, v2, acao) {
    return acao(v1, v2); // A callback é invocada AQUI dentro
}
const somar = (a, b) => a + b;
console.log(executarOperacao(10, 5, somar)); // Devolve 15
