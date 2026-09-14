"use strict";
let recebe;
let numero1 = 0, numero2 = 0;
let valores = [];
const validaSeNull = (valor) => (valor != null) ? true : false;
const validaSeVazio = (valor) => (valor != "") ? true : false;
const validaSeNumeroValido = (valor) => (!isNaN(Number(valor))) ? true : false;
const validaSeValorENumero = (valor) => ((validaSeNumeroValido(valor)) &&
    (validaSeVazio(valor)) &&
    (validaSeNull(valor))) ? true : false;
const receberValores = (posicao) => {
    do {
        recebe = prompt("Informe o valor " + posicao + ": ");
        if (!validaSeValorENumero(recebe)) {
            alert("Numero invalido, informe um valor numerico");
        }
    } while (!validaSeValorENumero(recebe));
    return recebe;
};
const converteParaNumber = (posicao) => {
    return Number(receberValores(posicao));
};
alert("Valor final " + converteParaNumber(1));
for (let index = 0; index < 3; index++) {
    valores[index] = converteParaNumber(index + 1);
}
for (const valor of valores) {
    console.log(valor);
}
