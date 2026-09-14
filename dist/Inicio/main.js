"use strict";
let receber;
let n1 = 0, n2 = 0;
do {
    receber = prompt("Informe o primeiro valor: ");
    if (!(!isNaN(Number(receber)) && (receber != "") && (receber != null))) {
        alert("Informe numeros validos");
    }
} while (!(!isNaN(Number(receber)) &&
    (receber != "") &&
    (receber != null)));
n1 = Number(receber);
do {
    receber = prompt("Informe o segundo valor: ");
    if (!(!isNaN(Number(receber)) && (receber != "") && (receber != null))) {
        alert("Informe numeros validos");
    }
} while (!(!isNaN(Number(receber)) &&
    (receber != "") &&
    (receber != null)));
n2 = Number(receber);
console.log(n1 + n2);
