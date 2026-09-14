type Produto1 = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  emEstoque: boolean;
};

const produtos1: Produto1[] = [
  { id: 1, nome: "Mouse Gamer", categoria: "Eletrônicos", preco: 150, emEstoque: true },
  { id: 2, nome: "Teclado Mecânico", categoria: "Eletrônicos", preco: 350, emEstoque: true },
  { id: 3, nome: "Cadeira Ergonômica", categoria: "Móveis", preco: 1200, emEstoque: false },
  { id: 4, nome: "Monitor 27'", categoria: "Eletrônicos", preco: 900, emEstoque: true },
  { id: 5, nome: "Mesa Stand-Desk", categoria: "Móveis", preco: 1500, emEstoque: false }
];

// EXECUTANDO O MAP
// Exemplo 1: Pegar apenas os nomes dos produtos (retorna string[])
const apenasNomes = produtos1.map(p => p.nome);

console.log("1. Apenas Nomes:", apenasNomes);

// Exemplo 2: Criar um novo objeto formatado com desconto de 10%
type ProdutoFormatado1 = {
  nome: string;
  precoComDesconto: string;
};

const listaPromocional: ProdutoFormatado1[] = produtos1.map((p) => ({
  nome: p.nome,
  precoComDesconto: `R$ ${(p.preco * 0.9).toFixed(2)}`
}));

console.log("2. Lista com Desconto:", listaPromocional);