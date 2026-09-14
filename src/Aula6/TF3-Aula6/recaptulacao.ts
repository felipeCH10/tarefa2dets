type PessoaRecap = {
    nome: string,
    idade: number,
    cpf: string,
    alturaMetro: number,
    pesoKG: number,
    genero?: string
}

const salaDeAula: PessoaRecap[]=[];

for (let index = 0; index < 3; index++) {
    salaDeAula.push({
        nome: "Aluno "+index,
        idade: index+10,
        cpf: "111111111111"+index,
        alturaMetro: 10*index,
        pesoKG: 11*index
    })
}

console.log(salaDeAula);
