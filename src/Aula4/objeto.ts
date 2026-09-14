type Telefone = {
    ddd: string,
    numero: string
}

type Aluno = {
    id: number|null,
    nome: string|null,
    telefone: Telefone[]
}

const criarAluno = ():Aluno =>{
    return {
        id: null,
        nome: null,
        telefone: []
    }
}

const main = ()=>{
    const aluno: Aluno = criarAluno();

    const sala: Aluno[] = [];
    for (let index = 0; index < 3; index++) {
        aluno.id = index;
        aluno.nome = "Nome: "+index;

        sala.push(aluno);
    }

    console.log(sala);
}

main();