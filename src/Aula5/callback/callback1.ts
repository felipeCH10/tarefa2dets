// Assinatura do tipo da callback
type Operacao = (a: number, b: number) => number;

// Função principal que recebe a callback por parâmetro
function executarOperacao(v1: number, v2: number, acao: Operacao): number {
  return acao(v1, v2); // A callback é invocada AQUI dentro
}

const somar: Operacao = (a, b) => a + b;
console.log(executarOperacao(10, 5, somar)); // Devolve 15