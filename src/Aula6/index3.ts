import * as fs from 'fs';

type Categoria = {
    codigo: number,
    nome: string
}

type SubCategoria = {
    codigo: number,
    nome: string,
    codigoCategoria: number
}

type ProdutoEstoque = {
    codigo: number,
    nome: string,
    preco: number,
    quantidade: number,
    ativo: boolean,
    subcategoria: SubCategoria,
    categoria: Categoria
}

type ListaProdutosSimplesAtivos = {
    nome: string,
    valor: number,
    quantidade: number
}

type VendaProduto = {
    idProduto: number;
    quantidadeProduto: number;
    valor: number;
};

type Venda = {
    produtos: VendaProduto[];
    valorTotal: number;
    dataHora: string;
};

const produtoDoJson: string = fs.readFileSync('../../src/Aula6/estoque.json', 'utf-8');
const arrayDeProdutos: ProdutoEstoque[] = JSON.parse(produtoDoJson);
const vendaDoJson: string =  fs.readFileSync('../../src/Aula6/venda.json', 'utf-8');
const arrayDeVendas: Venda[] = JSON.parse(vendaDoJson);

const listaProdutosSimplesAtivos: ListaProdutosSimplesAtivos[] = arrayDeProdutos
    .filter((produto:ProdutoEstoque) => produto.ativo)
    .map(
       (produto: ProdutoEstoque)=>{
            return{
                nome: produto.nome,
                valor: produto.preco,
                quantidade: produto.quantidade
            }
       }
    )

const valorTotalProdutosAtivos:number = arrayDeProdutos
    .filter((produto:ProdutoEstoque)=> produto.ativo)
    .reduce(
        (soma:number,produto:ProdutoEstoque)=>{
            return soma + produto.preco
        },0
    )

const totalDeProdutos: number = arrayDeProdutos.length;

const listaProdutosBaratos:ListaProdutosSimplesAtivos[] = arrayDeProdutos
    .filter((produto: ProdutoEstoque)=> produto.preco < 150)
    .map(
        (produto: ProdutoEstoque)=>{
            return{
                nome: produto.nome.toUpperCase(),
                valor: produto.preco,
                quantidade: produto.quantidade
            }
        }
    )

const totalVendas: number = arrayDeVendas.reduce(
    (soma: number, venda: Venda) => soma + venda.valorTotal,
    0
);

console.log("O total de vendas é: "+totalVendas);
