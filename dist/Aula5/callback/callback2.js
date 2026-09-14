"use strict";
// 2. Função principal que simula um atraso (ex: busca no banco de dados)
function buscarDadosServidor(v1, v2, acao) {
    console.log("[1] Servidor recebeu a requisição... Iniciando busca (vai demorar 3 segundos).");
    // Simulando um atraso de 3000 milissegundos (3 segundos)
    setTimeout(() => {
        const calculoDemorado = v1 + v2;
        console.log("\n[3] -> Servidor terminou! Invocando a callback agora.");
        acao(calculoDemorado); // A callback é disparada AQUI, 3 segundos depois
    }, 3000);
}
// 3. Criando a nossa função callback
const exibirNaTela = (res) => {
    console.log(`[CALLBACK] O resultado final que veio do servidor é: ${res}`);
};
// 4. Executando o código
console.log("[INÍCIO] Disparando a função principal.");
buscarDadosServidor(10, 5, exibirNaTela);
console.log("[2] O código continuou! Eu NÃO esperei o servidor terminar.");
console.log("[FIM] Última linha do arquivo executada.");
