type Subcategoria = {
  codigo: number;
  nome: string;
  codigoCategoria: number;
};

type Categoria = {
  codigo: number;
  nome: string;
};

type Produto = {
  codigo: number;
  nome: string;
  preco: number;
  quantidade: number;
  ativo: boolean;
  subcategoria?: Subcategoria;
  categoria?: Categoria;
};

type ProdutoResumido = {
  codigo: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type MetricasPreco = {
  quantidadeProdutosMenor100: number;
  mediaProdutosMenor100: number;
  quantidadeProdutosMaior500: number;
  mediaProdutosMaior500: number;
};

type RespostaApi = {
  produtos: Produto[];
  metricasPreco: MetricasPreco;
};

const carregarDashboard = async (): Promise<void> => {
  const statusEl = document.getElementById('status-carregamento') as HTMLElement | null;
  if (statusEl) {
    statusEl.textContent = 'Carregando dados da API...';
  }

  try {
    const resposta = await fetch('api.php');
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados: RespostaApi = (await resposta.json()) as RespostaApi;
    const produtos: Produto[] = dados.produtos;
    const metricasPreco: MetricasPreco = dados.metricasPreco;

    if (!produtos || produtos.length === 0) {
      if (statusEl) statusEl.textContent = 'Nenhum produto encontrado.';
      return;
    }

    const totalProdutos: number = produtos.reduce((total: number) => total + 1, 0);

    const somaPrecos: number = produtos.reduce(
      (acc: number, prod: Produto) => acc + prod.preco,
      0
    );
    const precoMedio: number = totalProdutos > 0 ? somaPrecos / totalProdutos : 0;

    const valorTotalEstoque: number = produtos.reduce(
      (acc: number, prod: Produto) => acc + (prod.preco * prod.quantidade),
      0
    );

    const produtoMenorEstoque: Produto = produtos.reduce(
      (menor: Produto, atual: Produto) => (atual.quantidade < menor.quantidade ? atual : menor),
      produtos[0]
    );

    const produtoMaiorEstoque: Produto = produtos.reduce(
      (maior: Produto, atual: Produto) => (atual.quantidade > maior.quantidade ? atual : maior),
      produtos[0]
    );

    const produtosFiltrados: Produto[] = produtos.filter((p: Produto) => p.ativo);
    const produtosResumidos: ProdutoResumido[] = produtosFiltrados.map((p: Produto) => ({
      codigo: p.codigo,
      nome: p.nome,
      preco: p.preco,
      quantidade: p.quantidade
    }));

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

    if (tabelaCorpoEl) {
      const linhasHtml = produtosResumidos
        .map(
          (p: ProdutoResumido) => `
          <tr>
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>R$ ${p.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${p.quantidade}</td>
          </tr>`
        )
        .join('');

      tabelaCorpoEl.innerHTML = linhasHtml;
    }

    if (statusEl) {
      const agora = new Date().toLocaleTimeString('pt-BR');
      statusEl.textContent = `Última sincronização com api.php: ${agora}`;
    }
  } catch (erro) {
    console.error('Erro ao buscar dados da API:', erro);
    if (statusEl) {
      statusEl.textContent = 'Erro ao carregar dados da API.';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const btnRecarregar = document.getElementById('btn-recarregar');
  if (btnRecarregar) {
    btnRecarregar.addEventListener('click', () => {
      carregarDashboard();
    });
  }

  carregarDashboard();
});