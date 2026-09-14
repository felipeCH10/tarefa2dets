"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
(0, promises_1.readFile)('../../src/API-JSONs/vendas.json', 'utf-8')
    .then((conteudo) => {
    return JSON.parse(conteudo);
})
    .then((vendas) => vendas.filter((v) => v.status === "pago"))
    .then((pagas) => (0, promises_1.writeFile)('./pagos.json', JSON.stringify(pagas, null, 2)))
    .then(() => console.log("[SUCESSO] Arquivo pagos.json gravado via Promises!"))
    .catch((err) => console.error("[ERRO PIPELINE]:", err.message));
