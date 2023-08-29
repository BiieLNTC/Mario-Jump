const mario = document.querySelector(".mario")
const cano = document.querySelector(".cano")
const nuvem = document.querySelector(".nuvens")
const gameOver = document.querySelector(".game-over")
const menu = document.querySelector(".menu")
const gameBoard = document.querySelector(".game-board")

const audioTema = new Audio('./audios/audio_theme.mp3')
const audioGameOver = new Audio('./audios/audio_gameover.mp3')
const audioPulo = new Audio('./audios/pulo_mario.mp3')

let pontos = 0
let marcouPonto = false
let gameLoop
let jogoEmAndamento = false
let tocarMusica = true

function pular() {
    if (jogoEmAndamento) {
        TocarPuloMario()
        mario.classList.add("pulo")
        setTimeout(() => { mario.classList.remove("pulo") }, 500)
    }
}

function StartGame() {
    jogoEmAndamento = true
    menu.style.display = 'none'
    TocarAudioTema()
    document.addEventListener('keydown', pular)

    cano.style.animation = "animacao-cano 2s infinite linear"

    gameLoop = setInterval(() => {

        const posicaoCano = cano.offsetLeft
        const posicaoNuvem = nuvem.offsetLeft
        const posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', '')

        if (posicaoCano <= 120 && posicaoCano > 0 && posicaoMario < 100) {
            cano.style.animation = 'none'
            cano.style.left = `${posicaoCano}px`

            nuvem.style.animation = 'none'
            nuvem.style.left = `${posicaoNuvem}px`

            mario.style.animation = 'none'
            mario.style.bottom = `${posicaoMario}px`

            mario.src = 'img/game-over.png'
            mario.style.width = '80px'
            mario.style.marginLeft = '50px'

            gameBoard.style.animation = 'none'

            audioTema.pause()
            TelaGameOver()
            clearInterval(gameLoop)
            return
        }

        if (posicaoCano <= 1 && !marcouPonto) {
            pontos++
            console.log(pontos)
            document.getElementById('pontuacao').innerHTML = pontos
            marcouPonto = true
        }

        if (posicaoCano > 10) {

            marcouPonto = false

            switch (pontos) {
                case 10:
                    cano.style.animation = "animacao-cano 0.8s infinite linear"
                    gameBoard.style.animation = "movimento-chao 0.15s infinite linear"
                    break

                case 15:
                    cano.style.animation = "animacao-cano 0.7s infinite linear"
                    gameBoard.style.animation = "movimento-chao 0.1s infinite linear"
                    break
            }
        }
    }, 10)
}

//#region TELAS

function Menu() {
    ResetarComponentes()
    gameOver.style.display = 'none'
    menu.style.display = 'flex'
}

//#endregion

//#region GAME OVER

function TelaGameOver() {
    jogoEmAndamento = false
    TocarAudioGameOver()
    document.getElementById('pontuacaoMax').innerHTML = `Pontuação Máxima: ${pontos}`
    gameOver.style.display = 'flex'

    setTimeout(pararAudioGameOver, 3000)
}

function ResetarComponentes() {
    pararAudioGameOver()
    pontos = 0;
    marcouPonto = false;
    document.getElementById('pontuacao').innerHTML = pontos;

    gameOver.style.display = 'none'

    mario.src = 'img/mario.gif'
    mario.style.width = '150px'
    mario.style.bottom = '0'
    mario.style.animation = ""

    cano.style.left = ''
    cano.style.right = '-80px'

    nuvem.style.left = ''
    nuvem.style.right = ''
    nuvem.style.animation = "animacao-nuvem 20s infinite linear"

    gameBoard.style.animation = "movimento-chao 0.2s infinite linear"

    audioGameOver.currentTime = 0
    audioTema.currentTime = 0

}

async function RestartGame() {
    clearInterval(gameLoop);
    ResetarComponentes()
    StartGame()
}

//#endregion

//#region AUDIOS

function TocarAudioTema() {
    if (tocarMusica)
        audioTema.play()
}

function TocarAudioGameOver() {
    if (tocarMusica)
        audioGameOver.play()
}

function TocarPuloMario(){
    if(tocarMusica){
        audioPulo.currentTime = 0.45
        audioPulo.play()
    }
}

function pararAudioGameOver() {
    audioGameOver.pause()
}


function MudarAudio() {
    audio = document.querySelector('#btn-audio')

    if (audio.getAttribute('class') === "bi bi-volume-up-fill") {
        audio.setAttribute('class', 'bi bi-volume-mute-fill')
        tocarMusica = false
    }
    else {
        audio.setAttribute('class', 'bi bi-volume-up-fill')
        tocarMusica = true
    }
}

//#endregion

//#region MODO CLARO / ESCURO

function MudarTema() {
    tema = document.querySelector('#btn-tema')

    if (tema.getAttribute('class') === "bi bi-sun-fill")
        SetarTemaClaro()
    else
        SetarTemaEscuro()

}

function SetarTemaClaro() {
    tema.setAttribute('class', 'bi bi-moon-fill')
    gameBoard.setAttribute('class', 'game-board')
    gameBoard.style.borderImage = "url(./img/chao.png) 2000 100"
    gameBoard.style.animation = "movimento-chao 0.2s infinite linear"
    cano.src = 'img/pipe.png'
}

function SetarTemaEscuro() {
    tema.setAttribute('class', 'bi bi-sun-fill')
    gameBoard.setAttribute('class', 'game-board modo-escuro')
    gameBoard.style.borderImage = "url(./img/chao-dark.png) 2000 100"
    gameBoard.style.animation = "movimento-chao 0.2s infinite linear"
    cano.src = 'img/pipe-dark.png'
}

//#endregion
