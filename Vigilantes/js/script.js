(function () {

  const FPS = 1;
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let caveiraDimensions = [120, 136];
  let devastacaoDimensions = [250, 250];
  let vidaDimension = [100, 54];
  let box = [1243,56];
  let pointsDimenssion = [621, 56];
  let probFoco = 25;
  let probCaveira = 5;
  let reserva;
  let focos = [];
  let gameLoop;
  let vidas = [];
  let pontuacaoAtual;
  let skull = 0;
  let fire = 0;
  let skulls = [];


  function init() {
    reserva = new Reserva();
    pontuacaoAtual = 0;
    box = new Box();
    pontos = new Points(pontuacaoAtual);
    for (let i = 0; i < 5; i++) {
      let life = new Vida(i);
      vidas.push(life);
    }
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      reserva.element.appendChild(this.element);
    }

  }

  class FocoCaveira {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-caveira";
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;
      this.element.style.left = `${Math.floor(Math.random() * (gameDimensions[0] - caveiraDimensions[0]))}px`;
      this.element.style.top = `${Math.floor(Math.random() * (gameDimensions[1] - caveiraDimensions[1]))}px`;
      reserva.element.appendChild(this.element);

    }
  }

  class Vida {
    constructor (indice) {
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = `${vidaDimension[0]}px`;
      this.element.style.height = `${vidaDimension[1]}px`;
      this.element.style.left = `${(indice*54) + (indice*29)}px`;
      this.element.style.top = 0;
      this.element.style.display = "inline-block";
      box.element.appendChild(this.element);
    }
  }

  class Box {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caixa";
      this.element.style.width = `${box[0]}px`
      this.element.style.height = `${box[1]}px`
      this.element.style.left = 0;
      this.element.style.top = 0;
      this.element.style.background = "white";
      this.element.style.position = "absolute";
      document.body.appendChild(this.element);
    }
  }

  class Points {
    constructor (pontuacaoAtual) {
      this.element = document.createElement("div");
      this.element.className = "points";
      this.element.textContent = "Pontos: " + `${pontuacaoAtual}`;
      this.element.style.width = `${pointsDimenssion[0]}px`;
      this.element.style.height = `${pointsDimenssion[1]}px`;
      this.element.style.top = 0;
      this.element.style.left = "622px";
      this.element.style.background = "black";
      box.element.appendChild(this.element);
    }
  }

  window.addEventListener("mousedown", function (event) {
    if(event.target.className === "foco-incendio"){
      let width = event.target.style.width;
      let height = event.target.style.width;
      let left = event.target.style.left;
      let top = event.target.style.top;
      event.target.remove();
      checar(width, height, left, top);
    }
    if(event.target.className === "foco-caveira"){
      let width = event.target.style.width;
      let height = event.target.style.width;
      let left = event.target.style.left;
      let top = event.target.style.top;
      event.target.remove();
      checar(width, height, left, top);
    }
  });

  function checar(width, height, top, left) {
    if (skull === 1) {
      skull = 0;
    }
    if (fire === 1) {
      fire = 0;
    }
  }
  function run () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
      fire = 1;
    }else{
      if(Math.random() * 100 < probCaveira){
        let caveira = new FocoCaveira();
        skulls.push(caveira);
        skull = 1;
      }
    }
    setInterval(checar, 2000);
  }

  init();
})();
