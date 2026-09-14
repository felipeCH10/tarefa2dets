"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// 3. Função principal que lê o arquivo e aceita a callback por parâmetro
function lerJsonExterno(caminhoArquivo, acao) {
    // O fs.readFile do Node é assíncrono e recebe uma callback interna
    fs.readFile(caminhoArquivo, 'utf-8', (err, textoBruto) => {
        if (err) {
            // Se der erro ao abrir o arquivo, repassa o erro para a callback do usuário
            acao(err, null);
            return;
        }
        try {
            // Desserialização: transforma o texto em objeto tipado
            const objetoConvertido = JSON.parse(textoBruto);
            // Invocação da callback passando NULL no erro e o OBJETO no dado
            acao(null, objetoConvertido);
        }
        catch (parseErr) {
            // Caso o JSON esteja mal formatado
            acao(parseErr, null);
        }
    });
}
// 4. Declaração da callback que vai processar o resultado
const processarPerfil = (erro, perfil) => {
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
