"use strict";
const produtos4 = [
    { id: 1, nome: "Mouse Gamer", categoria: "Eletrônicos", preco: 150, emEstoque: true },
    { id: 2, nome: "Teclado Mecânico", categoria: "Eletrônicos", preco: 350, emEstoque: true },
    { id: 3, nome: "Cadeira Ergonômica", categoria: "Móveis", preco: 1200, emEstoque: false },
    { id: 4, nome: "Monitor 27'", categoria: "Eletrônicos", preco: 900, emEstoque: true },
    { id: 5, nome: "Mesa Stand-Desk", categoria: "Móveis", preco: 1500, emEstoque: false }
];
// DESAFIO DE NEGÓCIO:
// Calcular o valor total em estoque apenas dos "Eletrônicos",
// aplicando 10% de desconto no preço de cada um deles.
const totalEletronicosComDesconto = produtos4
    // 1. FILTER: Isola apenas os eletrônicos que estão em estoque
    .filter((p) => p.categoria === "Eletrônicos" && p.emEstoque)
    // 2. MAP: Transforma os produtos filtrados calculando o preço com 10% OFF
    .map((p) => p.preco * 0.90)
    // 3. REDUCE: Soma o resultado de todos os preços com desconto
    .reduce((acc, precoComDesconto) => acc + precoComDesconto, 0);
console.log(`Total em Estoque para Eletrônicos (com 10% OFF): R$ ${totalEletronicosComDesconto}`);
