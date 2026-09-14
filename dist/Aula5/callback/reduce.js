"use strict";
const produtos3 = [
    { id: 1, nome: "Mouse Gamer", categoria: "Eletrônicos", preco: 150, emEstoque: true },
    { id: 2, nome: "Teclado Mecânico", categoria: "Eletrônicos", preco: 350, emEstoque: true },
    { id: 3, nome: "Cadeira Ergonômica", categoria: "Móveis", preco: 1200, emEstoque: false },
    { id: 4, nome: "Monitor 27'", categoria: "Eletrônicos", preco: 900, emEstoque: true },
    { id: 5, nome: "Mesa Stand-Desk", categoria: "Móveis", preco: 1500, emEstoque: false }
];
// EXECUTANDO O REDUCE
// Exemplo 1: Somar o valor total de todos os produtos
const valorTotalGeral = produtos3.reduce((acc, p) => {
    return acc + p.preco;
}, 0);
console.log(`1. Valor total do catálogo: R$ ${valorTotalGeral}`);
const contagemCategorias = produtos3.reduce((acc, p) => {
    if (!acc[p.categoria]) {
        acc[p.categoria] = 0;
    }
    acc[p.categoria]++;
    return acc;
}, {});
console.log("2. Contagem por Categoria:", contagemCategorias);
