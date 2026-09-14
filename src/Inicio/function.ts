let recebe : string|null; 
let numero1 : number =0, numero2: number=0;
let valores : number[] = [];

const validaSeNull = (valor:string|null):boolean => (valor != null) ? true:false;

const validaSeVazio = (valor:string|null):boolean => (valor != "") ? true:false;

const validaSeNumeroValido = (valor:string|null):boolean => (!isNaN(Number(valor))) ? true:false;

const validaSeValorENumero = (valor : string|null): boolean => 
    (
        (validaSeNumeroValido(valor))&&
        (validaSeVazio(valor))       &&
        (validaSeNull(valor))
    ) ? true : false;

const receberValores = (posicao:number):string|null =>{
    do {
        recebe = prompt("Informe o valor "+posicao+": ");
        if(!validaSeValorENumero(recebe)){
            alert("Numero invalido, informe um valor numerico");
        }
    } while (!validaSeValorENumero(recebe));
    return recebe;
}

const converteParaNumber = (posicao:number):number =>{
    return Number(receberValores(posicao));
}

alert("Valor final "+converteParaNumber(1));

for (let index = 0; index < 3; index++) {
    valores[index] = converteParaNumber(index+1);
}

for(const valor of valores){
    console.log(valor);
}