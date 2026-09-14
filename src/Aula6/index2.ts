import * as fs from 'fs';

type Produtos = {
    id: number,
    nome: string,
    preco: number,
    quantidade: number,
    ativo: string,
    categoria: string,
    valorPromocional: number
  }

type ProdutosComReajuste = {
    id: number,
    nome: string,
    valorReajustado: number
}

const importados: string = fs.readFileSync("estoque.json","utf-8");
const objetoDeProdutos: Produtos[] = JSON.parse(importados);

const produtosReajustados: ProdutosComReajuste[] = 
    objetoDeProdutos.map(objeto => {
        return{
            id: objeto.id,
            nome: objeto.nome.toUpperCase(),
            valorReajustado: objeto.preco * 1.125
        }
    })

const exportados: string = JSON.stringify(
    produtosReajustados,null,2);
fs.writeFileSync("produtosReajustados.json",exportados,"utf-8");