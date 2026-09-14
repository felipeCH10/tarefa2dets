import * as fs from 'fs';

type Venda = {
  id: number;
  cliente: string;
  valor: number;
  status: 'pago' | 'pendente';
};

fs.readFile('../../src/API-JSONs/vendas.json', 'utf-8', (err: NodeJS.ErrnoException | null, conteudo: string) => {
  if (err) {
    return console.error("[ERRO]:", err.message);
  }
  const vendas: Venda[] = JSON.parse(conteudo);
  console.log(`[SUCESSO] Vendas lidas via Callback: ${vendas.length}`);
  console.log(vendas);
});