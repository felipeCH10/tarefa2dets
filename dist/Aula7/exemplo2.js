"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
(0, promises_1.readFile)('../../src/API-JSONs/vendas.json', 'utf-8')
    .then((conteudo) => {
    return JSON.parse(conteudo);
})
    .then((vendas) => {
    console.log(`[PROMISE] Total de vendas lidas: ${vendas.length}`);
    return vendas;
})
    .then((vendas) => {
    console.log(vendas[0]);
})
    .catch((err) => {
    console.error("[ERRO PROMISE]:", err.message);
});
