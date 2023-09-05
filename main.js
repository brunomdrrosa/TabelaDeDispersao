// Nomes: Bruno Machado e Lucas Scaratti
// Disciplina: Estrutura de Dados Avançada
// Professor: Elmario Gomes Dutra Jr.
// Data: 05/09/2023

const fs = require("fs");
const readline = require("readline");

// Objeto de leitura de linhas
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Menu principal do programa
// Caso o usuário escolha a opção número 1, será feito a tabela de dispersão do menor conto
// Caso o usuário escolha a opção número 2, será feito a tabela do maior conto
// Caso o usuário escolha qualquer outro número, ele voltará para o menu
function menu() {
  console.log("=== MENU ===");
  console.log("Você deseja ver a tabela de dispersão de quais opções?");
  console.log("1. Conto pequeno");
  console.log("2. Conto grande (Um conto de duas cidades - Charles Dickens)");
  rl.question("Digite o número da opção desejada: ", function (answer) {
    if (answer === "1") {
      programa("tinytale.txt", 293);
      rl.close();
    } else if (answer === "2") {
      programa("tale.txt", 10531);
      rl.close();
    } else {
      console.log("Digite um número de 1 a 2\n");
      menu();
    }
  });
}

// Função principal do programa
function programa(nomeArquivo, tamanhoTabela) {
  fs.readFile(nomeArquivo, "utf8", (err, data) => {
    // Converte todo o texto para minúsculo
    var frasesMinusculas = data.toString().toLowerCase();

    // Expressões regulares para evitar caracteres indesejados
    const REGEX =
      /[#]|[0-9]|[*]|[,]|[\]]|[\[]|[:]|[.]|[w]{3}|(\b[a-z]{1}\b)|[\/]|[']|[\?]|["]|[!]|[;]|[()]|[_]|[$]|[%]|[`]/g;
    const ROMAN_NUMERALS =
      /(?=\b[mcdxlvi]{1,6}\b)m{0,4}(?:cm|cd|d?c{0,3})(?:xc|xl|l?x{0,3})(?:ix|iv|v?i{0,3})/g;

    frasesMinusculas = frasesMinusculas.replace(REGEX, "");
    frasesMinusculas = frasesMinusculas.replace(ROMAN_NUMERALS, "");
    frasesMinusculas = frasesMinusculas.replace(/--/g, " ").split(/\s+/);

    // Lista de palavras para remoção que não conseguimos remover com Regex
    const palavrasParaRemover = ["", "-", "c", "l", "d", "f", "m", "httpgutenbergnetlicense", 
    "trademarkcopyright", "httppglaforgfundraising", "business@pglaforg", "gbnewby@pglaforg", 
    "httppglaforgdonate"];

    // Remover hífen no final das palavras
    frasesMinusculas = frasesMinusculas.map(word => word.endsWith('-') ? word.slice(0, -1) : word);

    // Filtrar palavras indesejadas
    frasesMinusculas = frasesMinusculas.filter(
      (word) => !palavrasParaRemover.includes(word)
    );

    // Objeto para contar quantas vezes cada palavra se repete
    var contadorDePalavras = {};

    for (const palavra of frasesMinusculas) {
      if (contadorDePalavras[palavra]) {
        contadorDePalavras[palavra]++;
      } else {
        contadorDePalavras[palavra] = 1;
      }
    }

    // Ordena de forma decrescente para ver quais palavras são as mais frequentes no texto
    var palavrasEmOrdem = Object.keys(contadorDePalavras).sort(
      (a, b) => contadorDePalavras[b] - contadorDePalavras[a]
    );

    // Lista para armazenar a soma dos valores ASCII dos caracteres de cada palavra
    var listaTabelaAscii = [];

    // Calcular a soma dos valores ASCII dos caracteres individualmente e adicionar na lista acima
    for (let index = 0; index < palavrasEmOrdem.length; index++) {
      const totalSum = palavrasEmOrdem[index]
        .split("")
        .reduce((sum, element) => sum + element.charCodeAt(0), 0);
      listaTabelaAscii.push(totalSum);
    }

    // Tabela com as posições de cada palavra
    var listaResto = [];

    listaTabelaAscii.forEach((element) => {
      listaResto.push(hash(element, tamanhoTabela));
    });

    var arrayFinal = Array(tamanhoTabela);

    // Criação do objeto com a palavra e a frequência de vezes que ela se repetiu
    for (let index = 0; index < listaResto.length; index++) {
      const palavra = palavrasEmOrdem[index];
      const quantidade = contadorDePalavras[palavra];
      let posicao = listaResto[index];

      // Caso a posição já esteja ocupada, ele tenta adicionar no próximo índice
      while (arrayFinal[posicao]) {
        posicao = (posicao + 1) % arrayFinal.length;
      }

      const objeto = {
        posicao: posicao,
        palavra: palavra,
        quantidade: quantidade,
      };

      arrayFinal[posicao] = objeto;
    }
    const arrayOrdenado = arrayFinal.sort((a, b) => b.quantidade - a.quantidade);
    console.table(arrayOrdenado);
  });
}

// Função para calcular o índice com base no valor passado e no tamanho da tabela
function hash(value, M) {
  return value % M;
}

menu();
