# CruzaChip

Cruzadinha de Arquitetura Computacional com visual de placa de circuito. Feita em HTML, CSS e JavaScript puros para a Atividade Avaliativa III (Sprint 3).

**Jogue aqui:** https://github.com/daviborges011/CruzaChip

## Como jogar

1. Leia as pistas, separadas em Horizontais e Verticais, e clique numa casa do tabuleiro.
2. Digite as letras direto nas casas (maiúsculas, sem acento e sem espaço). O cursor avança sozinho.
3. Use as setas para andar pelo tabuleiro e **Enter** para alternar entre horizontal e vertical. Clicar numa pista também seleciona a palavra.
4. Clique em **Conferir** para ver quais palavras estão certas (verde) e quais estão erradas (vermelho). O contador mostra, por exemplo, "8 de 14 palavras".
5. Clique em **Reiniciar** para limpar o tabuleiro e começar de novo.

## Palavras e pistas (14 palavras)

### Horizontais

| Nº | Termo | No tabuleiro | Pista |
|---|---|---|---|
| 1 | memória de massa | `MEMORIADEMASSA` | Guarda arquivos e programas por muito tempo, com enorme capacidade, como HDs e SSDs. |
| 5 | CPU | `CPU` | O cérebro do computador: busca e executa as instruções dos programas. |
| 8 | dual core | `DUALCORE` | Processador multinúcleo que reúne 2 núcleos no mesmo chip, dividindo tarefas em paralelo. |
| 9 | DMA | `DMA` | Recurso que tira da CPU a tarefa de copiar dados vindos de periféricos. |
| 10 | ULA | `ULA` | Circuito dentro da CPU que soma, subtrai e compara valores. |
| 11 | RAM | `RAM` | Área principal de trabalho do computador: volátil, leitura e escrita, onde rodam os programas. |
| 12 | Flash | `FLASH` | Tecnologia não volátil regravável em blocos, presente em pen drives e cartões SD. |

### Verticais

| Nº | Termo | No tabuleiro | Pista |
|---|---|---|---|
| 2 | EEPROM | `EEPROM` | Chip permanente cujo conteúdo pode ser reescrito byte a byte, mesmo instalado no circuito. |
| 3 | ROM | `ROM` | Guarda de forma permanente as instruções básicas de inicialização, sem poder ser alterada. |
| 4 | address bus | `ADDRESSBUS` | Via de mão única pela qual a CPU diz qual posição da memória quer acessar. |
| 6 | quad core | `QUADCORE` | Processador multinúcleo que reúne 4 núcleos no mesmo chip, dividindo tarefas em paralelo. |
| 7 | cache | `CACHE` | Pequena e velocíssima, fica junto da CPU guardando dados usados com frequência. |
| 8 | data bus | `DATABUS` | Via de mão dupla que leva o conteúdo trocado entre CPU, memória e periféricos. |
| 10 | UC | `UC` | Componente interno da CPU que coordena e dirige a execução de cada instrução. |

## Estrutura

- `index.html`: página e estrutura do jogo
- `style.css`: visual de placa de circuito
- `script.js`: tabuleiro, pistas, conferência e reinício