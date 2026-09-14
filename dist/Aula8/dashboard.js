"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Função principal de carregamento e manipulação do Dashboard
const carregarDashboard = () => __awaiter(void 0, void 0, void 0, function* () {
    const statusEl = document.getElementById('status-carregamento');
    if (statusEl) {
        statusEl.textContent = 'Carregando dados da API...';
    }
    try {
        const resposta = yield fetch('api.php');
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = (yield resposta.json());
        const produtos = dados.produtos;
        const metricasPreco = dados.metricasPreco;
        if (!produtos || produtos.length === 0) {
            if (statusEl)
                statusEl.textContent = 'Nenhum produto encontrado.';
            return;
        }
        // 1. Total de produtos (reduce)
        const totalProdutos = produtos.reduce((total) => total + 1, 0);
        // 2. Preço médio dos produtos (reduce)
        const somaPrecos = produtos.reduce((acc, prod) => acc + prod.preco, 0);
        const precoMedio = totalProdutos > 0 ? somaPrecos / totalProdutos : 0;
        // 3. Valor total em estoque (reduce: preco * quantidade)
        const valorTotalEstoque = produtos.reduce((acc, prod) => acc + (prod.preco * prod.quantidade), 0);
        // 4. Produto com menor estoque (reduce)
        const produtoMenorEstoque = produtos.reduce((menor, atual) => (atual.quantidade < menor.quantidade ? atual : menor), produtos[0]);
        // 5. Produto com maior estoque (reduce)
        const produtoMaiorEstoque = produtos.reduce((maior, atual) => (atual.quantidade > maior.quantidade ? atual : maior), produtos[0]);
        // 6. Filtragem e mapeamento para tabela (filter + map)
        const produtosFiltrados = produtos.filter((p) => p.ativo);
        const produtosResumidos = produtosFiltrados.map((p) => ({
            codigo: p.codigo,
            nome: p.nome,
            preco: p.preco,
            quantidade: p.quantidade
        }));
        // Captura dos elementos HTML do DOM
        const totalProdutosEl = document.getElementById('total-produtos');
        const precoMedioEl = document.getElementById('preco-medio');
        const valorTotalEstoqueEl = document.getElementById('valor-total-estoque');
        const menorEstoqueEl = document.getElementById('menor-estoque');
        const maiorEstoqueEl = document.getElementById('maior-estoque');
        const quantidadeMenor100El = document.getElementById('quantidade-menor-100');
        const mediaMenor100El = document.getElementById('media-menor-100');
        const quantidadeMaior500El = document.getElementById('quantidade-maior-500');
        const mediaMaior500El = document.getElementById('media-maior-500');
        const tabelaCorpoEl = document.getElementById('tabela-produtos-corpo');
        // Injeção dos dados calculados nos cards
        if (totalProdutosEl) {
            totalProdutosEl.textContent = `${totalProdutos}`;
        }
        if (precoMedioEl) {
            precoMedioEl.textContent = `R$ ${precoMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        if (valorTotalEstoqueEl) {
            valorTotalEstoqueEl.textContent = `R$ ${valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        if (menorEstoqueEl) {
            menorEstoqueEl.textContent = `${produtoMenorEstoque.nome} (${produtoMenorEstoque.quantidade} un.)`;
        }
        if (maiorEstoqueEl) {
            maiorEstoqueEl.textContent = `${produtoMaiorEstoque.nome} (${produtoMaiorEstoque.quantidade} un.)`;
        }
        if (quantidadeMenor100El) {
            quantidadeMenor100El.textContent = `${metricasPreco.quantidadeProdutosMenor100}`;
        }
        if (mediaMenor100El) {
            mediaMenor100El.textContent = `R$ ${metricasPreco.mediaProdutosMenor100.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        if (quantidadeMaior500El) {
            quantidadeMaior500El.textContent = `${metricasPreco.quantidadeProdutosMaior500}`;
        }
        if (mediaMaior500El) {
            mediaMaior500El.textContent = `R$ ${metricasPreco.mediaProdutosMaior500.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        // Renderização das linhas da tabela
        if (tabelaCorpoEl) {
            const linhasHtml = produtosResumidos
                .map((p) => `
          <tr>
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>R$ ${p.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${p.quantidade}</td>
          </tr>`)
                .join('');
            tabelaCorpoEl.innerHTML = linhasHtml;
        }
        if (statusEl) {
            const agora = new Date().toLocaleTimeString('pt-BR');
            statusEl.textContent = `Última sincronização com api.php: ${agora}`;
        }
    }
    catch (erro) {
        console.error('Erro ao buscar dados da API:', erro);
        if (statusEl) {
            statusEl.textContent = 'Erro ao carregar dados da API.';
        }
    }
});
// Eventos de inicialização
document.addEventListener('DOMContentLoaded', () => {
    const btnRecarregar = document.getElementById('btn-recarregar');
    if (btnRecarregar) {
        btnRecarregar.addEventListener('click', () => {
            carregarDashboard();
        });
    }
    carregarDashboard();
});
