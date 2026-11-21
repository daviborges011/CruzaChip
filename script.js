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

// numeração: lê o tabuleiro da esquerda para a direita, de cima para baixo
let numero = 0;
for (let l = 0; l < linhas; l++) {
  for (let c = 0; c < colunas; c++) {
    let iniciam = PALAVRAS.filter(p => p.l === l && p.c === c);
    if (iniciam.length) {
      numero++;
      casas[l + ',' + c].num = numero;
      iniciam.forEach(p => (p.num = numero));
    }
  }
}

let atual = { casa: null, dir: 'H' };

function montarTabuleiro() {
  elTab.style.setProperty('--cols', colunas);
  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {
      let casa = casas[l + ',' + c];
      let el = document.createElement('div');
      if (!casa) { el.className = 'vazia'; elTab.appendChild(el); continue; }
      el.className = 'casa';
      if (casa.num) {
        let n = document.createElement('span');
        n.className = 'num';
        n.textContent = casa.num;
        el.appendChild(n);
      }
      let input = document.createElement('input');
      input.maxLength = 2;
      input.autocomplete = 'off';
      input.autocapitalize = 'characters';
      input.spellcheck = false;
      input.setAttribute('aria-label', 'Linha ' + (l + 1) + ', coluna ' + (c + 1));
      el.appendChild(input);
      casa.el = el;
      casa.input = input;
      ligarEventos(casa);
      elTab.appendChild(el);
    }
  }
}

function montarPistas() {
  PALAVRAS.slice().sort((a, b) => a.num - b.num).forEach(p => {
    let li = document.createElement('li');
    li.innerHTML = '<b>' + p.num + '</b> <span></span>';
    li.querySelector('span').textContent = p.p;
    li.addEventListener('click', () => selecionar(p.casas[0], p.d));
    p.li = li;
    document.getElementById(p.d === 'H' ? 'pistas-h' : 'pistas-v').appendChild(li);
  });
}

function palavraAtiva() {
  return atual.casa && atual.casa.palavras[atual.dir];
}

function outraDir(d) { return d === 'H' ? 'V' : 'H'; }

function realcar() {
  Object.values(casas).forEach(c => c.el.classList.remove('ativa', 'foco'));
  PALAVRAS.forEach(p => p.li.classList.remove('ativa'));
  let p = palavraAtiva();
  if (!p) return;
  p.casas.forEach(c => c.el.classList.add('ativa'));
  atual.casa.el.classList.add('foco');
  p.li.classList.add('ativa');
}

function selecionar(casa, dir) {
  atual.casa = casa;
  atual.dir = casa.palavras[dir] ? dir : outraDir(dir);
  realcar();
  casa.input.focus();
}

function mover(casa, dl, dc, dir) {
  let l = casa.l + dl, c = casa.c + dc;
  while (l >= 0 && l < linhas && c >= 0 && c < colunas) {
    let prox = casas[l + ',' + c];
    if (prox) { selecionar(prox, dir); return; }
    l += dl; c += dc;
  }
}

function limparCasa(casa) {
  casa.input.value = '';
  casa.el.classList.remove('certa', 'errada');
}

function ligarEventos(casa) {
  let input = casa.input;
  input.addEventListener('mousedown', () => { casa.jaAtiva = atual.casa === casa; });
  input.addEventListener('click', () => {
    if (casa.jaAtiva) {
      if (casa.palavras.H && casa.palavras.V) atual.dir = outraDir(atual.dir);
      realcar();
    } else {
      selecionar(casa, atual.dir);
    }
  });
  input.addEventListener('focus', () => {
    if (atual.casa !== casa) {
      atual.casa = casa;
      if (!casa.palavras[atual.dir]) atual.dir = outraDir(atual.dir);
      realcar();
    }
    input.select();
  });
  input.addEventListener('input', () => {
    let v = input.value.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase();
    input.value = v.slice(-1);
    casa.el.classList.remove('certa', 'errada');
    if (input.value) {
      let p = palavraAtiva();
      let i = p.casas.indexOf(casa);
      if (i < p.casas.length - 1) selecionar(p.casas[i + 1], atual.dir);
    }
  });
  input.addEventListener('keydown', e => {
    let teclas = {
      ArrowRight: [0, 1, 'H'], ArrowLeft: [0, -1, 'H'],
      ArrowDown: [1, 0, 'V'], ArrowUp: [-1, 0, 'V']
    };
    if (teclas[e.key]) {
      e.preventDefault();
      mover(casa, teclas[e.key][0], teclas[e.key][1], teclas[e.key][2]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (casa.palavras.H && casa.palavras.V) { atual.dir = outraDir(atual.dir); realcar(); }
    } else if (e.key === 'Backspace' && !input.value) {
      e.preventDefault();
      let p = palavraAtiva();
      let i = p.casas.indexOf(casa);
      if (i > 0) { limparCasa(p.casas[i - 1]); selecionar(p.casas[i - 1], atual.dir); }
    }
  });
}

function conferir() {
  Object.values(casas).forEach(c => c.el.classList.remove('certa', 'errada'));
  let acertos = 0;
  const erradas = [];
  PALAVRAS.forEach(p => {
    const digitado = p.casas.map(c => c.input.value || '·').join('');
    const ok = digitado === p.r;
    p.li.classList.toggle('certa', ok);
    p.li.classList.toggle('errada', !ok);
    if (ok) { acertos++; p.casas.forEach(c => c.el.classList.add('certa')); }
    else erradas.push(p);
  });
  erradas.forEach(p => p.casas.forEach(c => {
    if (!c.el.classList.contains('certa')) c.el.classList.add('errada');
  }));
  elContador.textContent = acertos + ' de ' + PALAVRAS.length + ' palavras';
  const falta = PALAVRAS.length - acertos;
  elMsg.textContent = falta === 0
    ? 'Placa completa! Todas as palavras estão certas.'
    : 'Faltam ' + falta + (falta === 1 ? ' palavra' : ' palavras') + '. As erradas estão em vermelho.';
}

function reiniciar() {
  Object.values(casas).forEach(limparCasa);
  PALAVRAS.forEach(p => p.li.classList.remove('certa', 'errada'));
  elContador.textContent = '0 de ' + PALAVRAS.length + ' palavras';
  elMsg.textContent = MSG_INICIAL;
  selecionar(PALAVRAS[0].casas[0], PALAVRAS[0].d);
}

document.getElementById('btn-conferir').addEventListener('click', conferir);
document.getElementById('btn-reiniciar').addEventListener('click', reiniciar);

montarTabuleiro();
montarPistas();
elContador.textContent = '0 de ' + PALAVRAS.length + ' palavras';


