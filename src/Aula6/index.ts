import * as fs from 'fs';

type Venda = {
  id: number;
  cliente: string;
  categoria: string;
  valor: number;
  status: 'pago' | 'pendente';
};

type RelatorioExecutivo = {
  totalVendasProcessadas: number;
  valorTotalLiquido: string;
  processadoEm: string;
};

// 1. Leitura e Desserialização
const dadosBrutos: string = fs.readFileSync('./vendas.json', 'utf-8');
const transacoes: Venda[] = JSON.parse(dadosBrutos);

// 2. Esteira Encadeada (Filter -> Map)
const valoresPagosComDesconto: number[] = transacoes
  .filter((t: Venda) => t.status === "pago")
  .map((t: Venda) => t.valor * 0.95);

// 3. Agregação (Reduce)
const somaLiquida: number = valoresPagosComDesconto.reduce(
  (acc: number, valor: number) => acc + valor, 
  0
);

// 4. Montagem da resposta fortemente tipada
const relatorio: RelatorioExecutivo = {
  totalVendasProcessadas: valoresPagosComDesconto.length,
  valorTotalLiquido: `R$ ${somaLiquida.toFixed(2)}`,
  processadoEm: new Date().toISOString().split('T')[0]
};

// 5. Persistência
fs.writeFileSync('./relatorio_executivo.json', JSON.stringify(relatorio, null, 2));
console.log("[DESAFIO TS CONCLUÍDO] 'relatorio_executivo.json' gerado com sucesso!");