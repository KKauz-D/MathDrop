function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
  const localCriacao = document.querySelector(".equacao-board");
  const pontuacao_texto = document.getElementById("points");
  let pontos = 0;

  class Equacao {
    static id = 0;
    constructor() {
      this.num1 = getRandomInt(0, 10);
      this.num2 = getRandomInt(0, 10);
      this.operacao = ["+", "-", "*", "/"][getRandomInt(0, 3)];

      if (this.operacao == "/") {
        this.num1 = this.num2 * getRandomInt(0, 10);
      }
      if (this.operacao == "/" && this.num2 == 0) {
        while (this.num2 == 0) {
          this.num2 = getRandomInt(1, 10);
        }
      }

      Equacao.id++;
    }
    instanciarEquacao() {
      const e = document.createElement("p");
      e.id = Equacao.id;
      e.className = "equacao";
      e.innerHTML = `${this.num1} ${this.operacao} ${this.num2}`;
      localCriacao.appendChild(e);
      e.style.left = `${getRandomInt(100, 600)}px`;
    }
  }

  function responder(event) {
    const resposta = document.querySelector(".resposta");
    if (event.key !== "Enter" || document.activeElement !== resposta) return;
    const expressoes = document.querySelectorAll(".equacao");
    if (expressoes.length === 0) {
      alert("Adicione uma equação antes de responder!");
      return;
    }
    const res = Number(resposta.value);
    resposta.value = "";
    expressoes.forEach((expressao, index) => {
      const resultado = eval(expressao.innerHTML);
      if (res === resultado) {
        expressao.remove();
        pontos++;
        pontuacao_texto.innerHTML = `Pontuação: ${pontos}`;
      }
    });
  }

  const loop = setInterval(() => {
    const expressoes = document.querySelectorAll(".equacao");
    expressoes.forEach((expressao) => {
      const bottom = +window
        .getComputedStyle(expressao)
        .bottom.replace("px", "");
      if (bottom <= 110) {
        expressao.remove();
        pontos--;
        pontuacao_texto.innerHTML = `Pontuação: ${pontos}`;
      }
    });
  }, 10);

  const criacao = setInterval(() => {
    const expressoes = document.querySelectorAll(".equacao");
    if (expressoes.length >= 0 && expressoes.length < 4) {
      const equacao = new Equacao();
      equacao.instanciarEquacao();
    }
  }, 1000);

  document.addEventListener("keypress", responder);
});
