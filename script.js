// ordem de apresentação do jogo
let order = [];

// ordem dos cliques do usuário
let clickedOrder = [];

// contagem de clique corretos do usuário para as cores apresentadas pelo jogo
let score = 0;

//    Associa um número para cada cor
//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

//    Define cada cor de acordo com o que foi definido no HTML 
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {

    // cria a cor de forma randômica
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {

        // salva a cor sorteada
        let elementColor = createColorElement(order[i]);

        // acende a cor sorteada
        lightColor(elementColor, Number(i) + 1);
    }

}

//acende a proxima cor
let lightColor = (element, number) => {

    number = number * 500;

    // ativa a cor via CSS
    setTimeout(() => {
        element.classList.add('selected');

    }, number - 250);

    // desativa a cor via CSS
    setTimeout(() => {
        element.classList.remove('selected');

    });
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {

    for(let i in clickedOrder) {

        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {

        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {

        createColorElement(color).classList.remove('selected');
        checkOrder();

    },250);
    /*som de clique*/
    somPop.play();

}

//funcao que retorna a cor
let createColorElement = (color) => {

    if(color == 0) {
        return green;

    } else if(color == 1) {
        return red;

    } else if (color == 2) {
        return yellow;

    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {



    score++;
    shuffleOrder();

}

//funcao para game over
let gameOver = () => {

    // Som para GAME OVER
    somExplosao.play();

    // Mensagem para GAME OVER
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    
    // Reinicia Jogo
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {

    

    alert('Bem vindo ao Genius! Iniciando novo jogo!');
    score = 0;
    
    nextLevel();
   
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();