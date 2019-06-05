function imassa(kg, alt) {
    var imc = kg / (alt ^ 2)
    var res = '';
    if (imc < 18.5) {
        res = 'Abaixo de peso';
    }
    else if (imc >= 18.5 && imc < 25) {
        res = 'No peso Normal';
    }
    else if (imc >= 25 && imc <= 30) {
        res = 'Acima de peso';
    }
    else {
        res = 'Obeso';
    }
    return res;
}

//console.log(imassa(70,1.70));


function inversa(f) {
    var frase = "";
    var div = f.split(" ");
    var s = "";

    for (var i = 0; i < div.length; i++) {
        s = div[i] + " ";
        for (var d = s.length - 1; d >= 0; d--) {
            frase += s[d];
        }
    }
    return frase;
}

//console.log(inversa('Hoje e Domingo'));

function vogais(f) {
    var d = f.toLowerCase();
    var num = 0;
    for (var i = 0; i < d.length; i++) {
        if (d[i] == "a" || d[i] == "e" || d[i] == "i" || d[i] == "o" || d[i] == "u") {
            num += 1
        }
    }
    return num;
}

//console.log(vogais('HOje amAnha depois'));

function letra(pal, let) {
    var p = pal.toLowerCase();
    var l = let.toLowerCase();
    var num = 0
    for (i = 0; i < p.length; i++) {
        if (p[i] == l) {
            num += 1
        }
    }
    return num;
}

//console.log(letra('amAnha','A'));

function hora(ent, sai) {
    var e = ent.split(":");
    var s = sai.split(":");
    var res='';
    var totalent = 0;
    var totalsai = 0;
    var total = 0;

    for(var i=0;i<e.length;i++){
        if(i==0){
            totalent += e[i] * 3600;
            totalsai += s[i] * 3600;
        }else if(i==1){
            totalent += e[i] * 60;
            totalsai += s[i] * 60;
        }else if(i==2){
            totalent += e[i]*1;
            totalsai += s[i]*1;
        }
    }
    total = totalsai - totalent;

    var hor = total / 3600;
    var min =(hor - Math.floor(hor)) *60;
    var seg = (min - Math.floor(min))*60;
    res = "Horas: " + Math.floor(hor) + "| Minutos: " + Math.round(min) + "| Segundos: " + Math.round(seg);

    return res;
}

//console.log(hora('08:45:10','18:00:00'));

function rectangulo(altura, largura) {
    var a = "";
    var s=0;
    while(s<altura){
        for (var d = 0; d < largura; d++) {
            a+="*";
        }
        a+="\n";
        s++;
    }
    return a;
}
console.log(rectangulo(3, 4));

function triangulo(altura){
    
}

