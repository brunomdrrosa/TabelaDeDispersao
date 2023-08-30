const fs = require('fs')

fs.readFile('tinytale.txt', 'utf8', (err, data) => {
    var listaFrases = data.toString().split(/\s+/);

    var contadorDePalavras = {};

    for (const palavra of listaFrases) {
        if (contadorDePalavras[palavra]) {
            contadorDePalavras[palavra]++;
        } else {
            contadorDePalavras[palavra] = 1;
        }
    }

    var palavrasEmOrdem = Object.keys(contadorDePalavras).sort((a, b) => contadorDePalavras[b] - contadorDePalavras[a]);

    var listaTabelaAscii = []

    for (let index = 0; index < palavrasEmOrdem.length; index++) {
        const totalSum = palavrasEmOrdem[index].split("").reduce((sum, element) => sum + element.charCodeAt(0), 0);
        listaTabelaAscii.push(totalSum)
    }

    var listaResto = []

    listaTabelaAscii.forEach(element => {
        listaResto.push(hash(element, 293))
    });

    console.log(listaResto)

    var arrayFinal = Array(293)

    for (let index = 0; index < listaResto.length; index++) {
        palavra = palavrasEmOrdem[index]
        console.log(palavra)
        quantidade = contadorDePalavras[palavra]
        const objeto = { posicao: listaResto[index], palavra: palavra, quantidade: quantidade };
        arrayFinal[listaResto[index]] = objeto
    }
    console.log(arrayFinal)


});

function hash(value, M) {
    return value % M;
}