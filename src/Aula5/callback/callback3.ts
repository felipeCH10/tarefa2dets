import * as fs from 'fs';

// 1. Definição do tipo para o dado que esperamos do JSON
type PerfilUsuario = {
  usuario: string;
  cargo: string;
  ativo: boolean;
};

// 2. Assinatura do tipo da callback
// Segue o padrão do Node: primeiro parâmetro é o erro (se houver), o segundo é o dado
type RespostaCallback = (erro: Error | null, dados: PerfilUsuario | null) => void;

// 3. Função principal que lê o arquivo e aceita a callback por parâmetro
function lerJsonExterno(caminhoArquivo: string, acao: RespostaCallback): void {
  // O fs.readFile do Node é assíncrono e recebe uma callback interna
  fs.readFile(caminhoArquivo, 'utf-8', (err, textoBruto) => {
    if (err) {
      // Se der erro ao abrir o arquivo, repassa o erro para a callback do usuário
      acao(err, null);
      return;
    }

    try {
      // Desserialização: transforma o texto em objeto tipado
      const objetoConvertido: PerfilUsuario = JSON.parse(textoBruto);
      
      // Invocação da callback passando NULL no erro e o OBJETO no dado
      acao(null, objetoConvertido);
    } catch (parseErr) {
      // Caso o JSON esteja mal formatado
      acao(parseErr as Error, null);
    }
  });
}

// 4. Declaração da callback que vai processar o resultado
const processarPerfil: RespostaCallback = (erro, perfil) => {
  if (erro) {
    console.error("[ERRO DO SISTEMA]: Falha ao carregar o arquivo:", erro.message);
    return;
  }

  if (perfil) {
    console.log(`[SUCESSO]: Usuário ${perfil.usuario} carregado. Cargo: ${perfil.cargo}`);
  }
};

// 5. Chamada da função principal passando o caminho e a callback
lerJsonExterno('./info.json', processarPerfil);