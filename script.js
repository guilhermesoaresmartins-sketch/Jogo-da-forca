// ---------- ALEATORIEDADE ----------
function sortearNumero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortearItem(lista) {
  return lista[sortearNumero(0, lista.length - 1)];
}

// ---------- DADOS ----------
const palavras = [
  "javascript", "termux", "algoritmo", "modulo", "fluxograma",
  "navegador", "variavel", "funcao", "condicional", "repositorio",
];

const textos = {
  inicio: "Escolha uma letra!",
  acerto: "Boa! A letra {letra} existe na palavra.",
  erro: "Ih, a letra {letra} não tem.",
  vitoria: "Ganhou! 🎉 A palavra era {palavra}.",
  derrota: "Perdeu 😅 A palavra era {palavra}.",
  vidas: "Vidas restantes: {vidas}",
};

// ---------- REPLACE: troca {chave} pelo valor ----------
function mensagem(tipo, dados = {}) {
  let texto = textos[tipo];

  for (const chave of Object.keys(dados)) {
    texto = texto.replace("{" + chave + "}", dados[chave]);
  }

  return texto;
}

// ---------- ELEMENTOS DA PÁGINA ----------
const elVidas = document.getElementById("vidas");
const elPalavra = document.getElementById("palavra");
const elMensagem = document.getElementById("mensagem");
const elTeclado = document.getElementById("teclado");
const botaoReiniciar = document.getElementById("reiniciar");

// ---------- ESTADO DO JOGO ----------
let palavra = "";
let tentadas = [];
let vidas = 6;

// ---------- FUNÇÕES ----------
function mascara() {
  let resultado = "";

  for (const letra of palavra) {
    if (tentadas.includes(letra)) {
      resultado += letra + " ";
    } else {
      resultado += "_ ";
    }
  }

  return resultado.trim();
}

function ganhou() {
  let completa = true;

  for (const letra of palavra) {
    if (!tentadas.includes(letra)) {
      completa = false;
      break; // condição de parada: achou uma faltando, para o loop
    }
  }

  return completa;
}

function atualizarTela() {
  elPalavra.textContent = mascara();
  elVidas.textContent = mensagem("vidas", { vidas });
}

function fimDeJogo() {
  // desativa todos os botões do teclado
  for (const botao of elTeclado.children) {
    botao.disabled = true;
  }
}

function chutar(letra, botao) {
  botao.disabled = true;
  tentadas.push(letra);

  if (palavra.includes(letra)) {
    elMensagem.textContent = mensagem("acerto", { letra });
  } else {
    vidas--;
    elMensagem.textContent = mensagem("erro", { letra });
  }

  atualizarTela();

  if (ganhou()) {
    elMensagem.textContent = mensagem("vitoria", { palavra });
    fimDeJogo();
  } else if (vidas === 0) {
    elMensagem.textContent = mensagem("derrota", { palavra });
    fimDeJogo();
  }
}

function criarTeclado() {
  elTeclado.innerHTML = "";

  for (const letra of "abcdefghijklmnopqrstuvwxyz") {
    const botao = document.createElement("button");
    botao.textContent = letra.toUpperCase();
    botao.addEventListener("click", function () {
      chutar(letra, botao);
    });
    elTeclado.appendChild(botao);
  }
}

function novoJogo() {
  palavra = sortearItem(palavras);
  tentadas = [];
  vidas = 6;

  elMensagem.textContent = mensagem("inicio");
  criarTeclado();
  atualizarTela();
}

botaoReiniciar.addEventListener("click", novoJogo);

novoJogo();
