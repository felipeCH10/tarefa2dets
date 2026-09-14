"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// 1. Leitura e Desserialização
const dadosBrutos = fs.readFileSync('./vendas.json', 'utf-8');
const transacoes = JSON.parse(dadosBrutos);
// 2. Esteira Encadeada (Filter -> Map)
const valoresPagosComDesconto = transacoes
    .filter((t) => t.status === "pago")
    .map((t) => t.valor * 0.95);
// 3. Agregação (Reduce)
const somaLiquida = valoresPagosComDesconto.reduce((acc, valor) => acc + valor, 0);
// 4. Montagem da resposta fortemente tipada
const relatorio = {
    totalVendasProcessadas: valoresPagosComDesconto.length,
    valorTotalLiquido: `R$ ${somaLiquida.toFixed(2)}`,
    processadoEm: new Date().toISOString().split('T')[0]
};
// 5. Persistência
fs.writeFileSync('./relatorio_executivo.json', JSON.stringify(relatorio, null, 2));
console.log("[DESAFIO TS CONCLUÍDO] 'relatorio_executivo.json' gerado com sucesso!");
