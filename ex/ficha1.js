
function nota(pra, teo) {
    var res = (pra + teo) / 2;

    if (res >= 10) {
        console.log("Aprovado");
    }
    else {
        console.log("Reprovado");
    }


}
//nota(10,15);

function mes(num) {
    switch (num) {
        case 1:
            console.log("Janeiro")
            break;
        case 2:
            console.log("Fevereiro")
            break;
        case 3:
            console.log("Março")
            break;
        case 4:
            console.log("Abril")
            break;
        case 5:
            console.log("Maio")
            break;
        case 6:
            console.log("Junho")
            break;
        case 7:
            console.log("Julho")
            break;
        case 8:
            console.log("Agosto")
            break;
        case 9:
            console.log("Setembro")
            break;
        case 10:
            console.log("Outubro")
            break;
        case 11:
            console.log("Novembro")
            break;
        case 12:
            console.log("Dezembro")
            break;

    }

}

//mes(3);

function operacao(p,s,o){
    switch (o){
        case '+':
            console.log(p+s)
            break;
        case '-':
            console.log(p-s)
            break;
        case '*':
            console.log(p*s)
            break;
        case '/':
            console.log(p/s)
            break;
        case '^':
            console.log(Math.pow(p,s))
            break;
    }
}

//operacao(7,5,'^')

function multiplos(){
    var r = 5;
    var mul = 1;
    var res = '';
    while(res<20)
    {
        console.log(res);
        res = r*mul;
        mul = mul +1;
        
    }
}

//multiplos();

function soma(){
    var r = 1
    var res = 0;
    while(r<=100){
        res = res + r;
        r=r+1
    }
    console.log(res);
}

//soma();

function factorial(num){
    var r = num;
    var res = 1;
    while(r != 0){
        res = r*res;
        r=r-1
    }
    console.log(res);
}

//factorial(5);

function max(num){
    var max = num[0];
    res= 0;
    for(var i = 1;i<num.length;i++){
        if(num[i]>max){
            max = num[i];
        }
    }
    return max;
}

console.log(max([1,2,3,4,5]));

function min(num){
    var min=num[0];
    for(var i = 1;i<num.length;i++){
        if(num[i]<min){
            min = num[i];
        }
    }
    return min;
}

console.log(min([1,2,3,4,5]));

function med(num){
    var soma = 0;
    var x= 0;
    for (var i=0;i<num.length;i++){
        soma = soma + num[i];
        x=x+1
    }
    return soma / x

}

console.log(med([1,2,3,4,5]));