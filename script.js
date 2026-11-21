// Palavras do tabuleiro: r = resposta, l/c = linha/coluna inicial, d = H (horizontal) ou V (vertical), p = pista
let PALAVRAS = [
  {
    "r": "MEMORIADEMASSA",
    "l": 0,
    "c": 0,
    "d": "H",
    "p": "Guarda arquivos e programas por muito tempo, com enorme capacidade, como HDs e SSDs."
  },
  {
    "r": "EEPROM",
    "l": 0,
    "c": 1,
    "d": "V",
    "p": "Chip permanente cujo conteúdo pode ser reescrito byte a byte, mesmo instalado no circuito."
  },
  {
    "r": "ROM",
    "l": 0,
    "c": 4,
    "d": "V",
    "p": "Guarda de forma permanente as instruções básicas de inicialização, sem poder ser alterada."
  },
  {
    "r": "ADDRESSBUS",
    "l": 0,
    "c": 13,
    "d": "V",
    "p": "Via de mão única pela qual a CPU diz qual posição da memória quer acessar."
  },
  {
    "r": "CPU",
    "l": 2,
    "c": 0,
    "d": "H",
    "p": "O cérebro do computador: busca e executa as instruções dos programas."
  },
  {
    "r": "QUADCORE",
    "l": 2,
    "c": 8,
    "d": "V",
    "p": "Processador multinúcleo que reúne 4 núcleos no mesmo chip, dividindo tarefas em paralelo."
  },
  {
    "r": "CACHE",
    "l": 2,
    "c": 10,
    "d": "V",
    "p": "Pequena e velocíssima, fica junto da CPU guardando dados usados com frequência."
  },
  {
    "r": "DUALCORE",
    "l": 4,
    "c": 6,
    "d": "H",
    "p": "Processador multinúcleo que reúne 2 núcleos no mesmo chip, dividindo tarefas em paralelo."
  },
  {
    "r": "DATABUS",
    "l": 4,
    "c": 6,
    "d": "V",
    "p": "Via de mão dupla que leva o conteúdo trocado entre CPU, memória e periféricos."
  },
  {
    "r": "DMA",
    "l": 5,
    "c": 4,
    "d": "H",
    "p": "Recurso que tira da CPU a tarefa de copiar dados vindos de periféricos."
  },
  {
    "r": "ULA",
    "l": 7,
    "c": 4,
    "d": "H",
    "p": "Circuito dentro da CPU que soma, subtrai e compara valores."
  },
  {
    "r": "UC",
    "l": 7,
    "c": 4,
    "d": "V",
    "p": "Componente interno da CPU que coordena e dirige a execução de cada instrução."
  },
  {
    "r": "RAM",
    "l": 8,
    "c": 8,
    "d": "H",
    "p": "Área principal de trabalho do computador: volátil, leitura e escrita, onde rodam os programas."
  },
  {
    "r": "FLASH",
    "l": 10,
    "c": 3,
    "d": "H",
    "p": "Tecnologia não volátil regravável em blocos, presente em pen drives e cartões SD."
  }
];

let elTab = document.getElementById('tabuleiro');
let elContador = document.getElementById('contador');
let elMsg = document.getElementById('mensagem');
let MSG_INICIAL = elMsg.textContent;

let linhas = Math.max(...PALAVRAS.map(p => p.d === 'V' ? p.l + p.r.length : p.l + 1));
let colunas = Math.max(...PALAVRAS.map(p => p.d === 'H' ? p.c + p.r.length : p.c + 1));
let casas = {};

PALAVRAS.forEach(p => {
  p.casas = [];
  for (let k = 0; k < p.r.length; k++) {
    let l = p.d === 'V' ? p.l + k : p.l;
    let c = p.d === 'H' ? p.c + k : p.c;
    let chave = l + ',' + c;
    casas[chave] = casas[chave] || { l, c, palavras: {} };
    casas[chave].palavras[p.d] = p;
    p.casas.push(casas[chave]);
  }
});