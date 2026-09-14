import * as fs from "fs"

type estoque = {
    id?: number,
    nome: string,
    preco: number,
    quantidade: number
}

console.log("Passou aqui por primeiro");

fs.readFile('../../../src/Aula6/TF3-Aula6/estoque.json',"utf-8",(erro:NodeJS.ErrnoException|null,dados:string)=>{
    console.log("Passou aqui por terceiro");
    if(erro){
        console.log("Aconteceu o erro: "+erro.message);
    }else{
        let dadosJson:estoque[] = JSON.parse(dados);
        dadosJson= dadosJson.map((item:estoque)=>{
            return{
                nome: item.nome.toUpperCase(),
                preco: item.preco,
                quantidade: item.quantidade
            }
        });
        const dadoJsonString:string = JSON.stringify(dadosJson,null,2);
        fs.writeFile("../../../src/Aula6/TF3-Aula6/retorno.json",dadoJsonString,"utf-8",
        (err:NodeJS.ErrnoException | null)=>{
            if(err){
                console.log("Aconteceu o erro: "+err.message);
            }else{
                console.log("Dados escritos com sucesso");
            }
        }
    )
    }
});

console.log("Passou aqui por segundo");