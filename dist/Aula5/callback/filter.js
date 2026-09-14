"use strict";
const produtos2 = [
    { id: 1, nome: "Mouse Gamer", categoria: "Eletrônicos", preco: 150, emEstoque: true },
    { id: 2, nome: "Teclado Mecânico", categoria: "Eletrônicos", preco: 350, emEstoque: true },
    { id: 3, nome: "Cadeira Ergonômica", categoria: "Móveis", preco: 1200, emEstoque: false },
    { id: 4, nome: "Monitor 27'", categoria: "Eletrônicos", preco: 900, emEstoque: true },
    { id: 5, nome: "Mesa Stand-Desk", categoria: "Móveis", preco: 1500, emEstoque: false }
];
// EXECUTANDO O FILTER
// Exemplo 1: Filtrar apenas produtos que estão em estoque
const apenasDisponiveis = produtos2.filter((p) => p.emEstoque === true);
console.log("1. Produtos em Estoque:", apenasDisponiveis);
// Exemplo 2: Filtrar apenas Eletrônicos com preço menor que 500
const eletronicosBaratos = produtos2.filter((p) => {
    return p.categoria === "Eletrônicos" && p.preco < 500;
});
console.log("2. Eletrônicos Baratos:", eletronicosBaratos);
