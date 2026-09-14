import { readFile } from 'fs/promises';

type Venda = {
  id: number;
  cliente: string;
  valor: number;
  status: 'pago' | 'pendente';
};

readFile('../../src/API-JSONs/vendas.json', 'utf-8')
  .then((conteudo: string): Venda[] => {
    return JSON.parse(conteudo) as Venda[];
  })
  .then((vendas: Venda[]) => {
    console.log(`[PROMISE] Total de vendas lidas: ${vendas.length}`);
    return vendas;
  })
  .then((vendas: Venda[])=>{
    console.log(vendas[0]);
  })
  .catch((err: Error) => {
    console.error("[ERRO PROMISE]:", err.message);
  });