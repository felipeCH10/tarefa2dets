import { readFile, writeFile } from 'fs/promises';

type Venda = {
  id: number;
  cliente: string;
  valor: number;
  status: 'pago' | 'pendente';
};

readFile('../../src/API-JSONs/vendas.json', 'utf-8')
  .then((conteudo: string ): Venda[] => {
    return JSON.parse(conteudo)
  })
  .then((vendas: Venda[]) => vendas.filter((v: Venda) => v.status === "pago"))
  .then((pagas : Venda[]) => writeFile('./pagos.json', JSON.stringify(pagas, null, 2)))
  .then((               ) => console.log("[SUCESSO] Arquivo pagos.json gravado via Promises!"))
  .catch((err  : Error  ) => console.error("[ERRO PIPELINE]:", err.message));