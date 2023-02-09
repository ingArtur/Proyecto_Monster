const sectionSeleccionarAtaque = document.getElementById ('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMonstersJugador = document.getElementById("boton-monsters")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMonsters = document.getElementById ('seleccionar-Monsters')
const spanMonstersJugador = document.getElementById('monsters-jugador')
const spanMonsterEnemigo = document.getElementById('monsters-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const  sectionMensajes = document.getElementById('resultado')
const  ataquesDelJugador = document.getElementById('ataques-del-jugador')
const  ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const spanMonstersEnemigo = document.getElementById('monsters-enemigo') 
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques= document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null 
let monsters = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMonsters
let inputHipodoge 
let inputCapipepo 
let inputDragus 
let monsterjugador
let monsterJugadorObjeto
let ataquesMonsters
let ataquesMonsterEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "../assets/5.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height =  alturaQueBuscamos

class Monsters {
    constructor (nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadx = 0
        this.velocidady = 0

    }

    pintarMonster() {

        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }

}



let Hipodoge = new Monsters ("Hipodoge", '../assets/FDRl2ksXIAAtBmJ.png', 5, '../assets/H.png')

let Capipepo = new Monsters('Capipepo', '../assets/FQKrwt4X0AU2E5y.png', 5, '../assets/C.png')

let Dragus = new Monsters ('Dragus', '../assets/img_03_pc.png', 5, '../assets/D.png')

let HipodogeEnemigo = new Monsters ("Hipodoge", '../assets/FDRl2ksXIAAtBmJ.png', 5, '../assets/H.png')

let CapipepoEnemigo= new Monsters('Capipepo', '../assets/FQKrwt4X0AU2E5y.png', 5, '../assets/C.png')

let DragusEnemigo = new Monsters ('Dragus', '../assets/img_03_pc.png', 5, '../assets/D.png')



Hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🪴', id: 'boton-tierra' },)

HipodogeEnemigo.ataques.push(
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🪴', id: 'boton-tierra' },
)
Capipepo.ataques.push(
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '💧', id: 'boton-agua ' },
    {nombre: '🔥', id: 'boton-fuego' },)

CapipepoEnemigo.ataques.push(
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '💧', id: 'boton-agua ' },
    {nombre: '🔥', id: 'boton-fuego' },
)

Dragus.ataques.push(
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '💧', id: 'boton-agua' },
)
DragusEnemigo.ataques.push(
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '💧', id: 'boton-agua' },
)

monsters.push(Hipodoge,Capipepo,Dragus)
  
function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    
    monsters.forEach((monsters) => {   
        opcionDeMonsters = ` 
        <input type="radio" name="Monsters" id=${monsters.nombre} />
        <label class="tarjeta-de-monsters" for=${monsters.nombre}>
            <p>${monsters.nombre}</p>
            <img src= ${monsters.foto}  alt=${monsters.nombre}>
        </label>`

        contenedorTarjetas.innerHTML +=  opcionDeMonsters

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputDragus = document.getElementById('Dragus')

    })

    botonMonstersJugador.addEventListener('click', SeleccionarMonstersJugador)

     botonReiniciar.addEventListener('click', reiniciarJuego)
    

     unirseAlJuego()

    }

function unirseAlJuego () {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then( function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                  
                    })
            } 

        })
}
function SeleccionarMonstersJugador() {
    sectionSeleccionarMonsters.style.display = 'none'

    if(inputHipodoge.checked) {
        spanMonstersJugador.innerHTML = inputHipodoge.id
        monsterjugador = inputHipodoge.id
    }
    else if (inputCapipepo.checked) {
        spanMonstersJugador.innerHTML = inputCapipepo.id
        monsterjugador = inputCapipepo.id
    }
    else if(inputDragus.checked) {
        spanMonstersJugador.innerHTML = inputDragus.id
        monsterjugador = inputDragus.id  
    }
    else { 
        alert('Selecciona un monsters')
    } 
    seleccionarMonster(monsterjugador)

    extraerAtaques(monsterjugador)
    sectionVerMapa.style.display ='flex'
    iniciarMapa()
}
function seleccionarMonster(monsterjugador) {
    fetch(`http://localhost:8080/monster/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            monster: monsterjugador
        })
    })
}

function extraerAtaques(monsterjugador) {
    let ataques
    for (let i = 0; i < monsters.length; i++) {
        if (monsterjugador === monsters [i].nombre) {
           ataques =  monsters [i].ataques    
        }
    }
   mostrarAtaques (ataques)
}

function mostrarAtaques (ataques) {
    ataques.forEach((ataque) => {
        ataquesMonsters = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML +=         ataquesMonsters
    })

     botonFuego = document.getElementById( 'boton-fuego')
     botonAgua = document.getElementById( 'boton-agua')
     botonTierra = document.getElementById( 'boton-tierra')
     botones = document.querySelectorAll ('.BAtaque')   
     

}



function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#AFAEA9'
                boton.disabled = true      
            } 
            else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#AFAEA9'
                boton.disabled = true  
            } 
             else {
            ataqueJugador.push('TIERRA')
            console.log(ataqueJugador)
             boton.style.background = '#AFAEA9'
             boton.disabled = true  
           }
           ataqueAleatorioEnemigo() 
        })
    }) 
   
}



function SeleccionarMonstersEnemigo(enemigo) {

    spanMonsterEnemigo.innerHTML = enemigo.nombre
    ataquesMonsterEnemigo = enemigo.ataques
    secuenciaAtaque()
}

 
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMonsterEnemigo.length - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
   
    iniciarPelea()

}

function iniciarPelea() {
    if(ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
   

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }
        else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index]=== 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } 
        else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index]=== 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasEnemigo
        }
        else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE") 
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
   
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo){
    crearMensajeFinal('Esto fue un empate!!!')
    } else if(victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('FELICITACIONES GANASTE 🥳👍')
    } 
    else {
        crearMensajeFinal('QUE MAL PERDISTE  🤣🤣')
    }
}


 function crearMensaje(resultado) {

        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')
        
        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

       
        ataquesDelJugador .appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    }

    function crearMensajeFinal(resultadoFinal) {

        sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
    }

  /*function seleccionarMonstersEnemigo () {
        let ataqueAleatorio = aleatorio(1,3)

        if (ataqueAleatorio == 1) {
            spanMonstersEnemigo.innerHTML = 'Hipodoge'
        } else if (ataqueAleatorio == 2){
            spanMonstersEnemigo.innerHTML = 'Capipepo'
        } else {
            spanMonstersEnemigo.innerHTML = 'Dragus'
        }

  }*/

  function reiniciarJuego() {
        location.reload()
  }

    function aleatorio(min, max) {return Math.floor(Math.random() * (max - min + 1) + min)}

    function pintarCanvas() {
         
        monsterJugadorObjeto.x =  monsterJugadorObjeto.x +  monsterJugadorObjeto.velocidadx
         monsterJugadorObjeto.y =  monsterJugadorObjeto.y +  monsterJugadorObjeto.velocidady
        lienzo.clearRect(0, 0,mapa.width, mapa.height)
        lienzo.drawImage (
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
        )

        monsterJugadorObjeto.pintarMonster()
        HipodogeEnemigo.pintarMonster()
        CapipepoEnemigo.pintarMonster()
        DragusEnemigo.pintarMonster()
        if( monsterJugadorObjeto.velocidadx !== 0 || monsterJugadorObjeto.velocidady !== 0) {
            revisarColision(HipodogeEnemigo)
            revisarColision(CapipepoEnemigo)
            revisarColision(DragusEnemigo)
        }
    }

    function moverArriba () {
        const miMonster = obtenerObjetosMonster ()
        miMonster.velocidady = - 3

    }
    function moverAbajo () {
        monsterJugadorObjeto.velocidady = + 3

    }
    function moverDerecha () {
        monsterJugadorObjeto.velocidadx = + 3

    }
    function moverIzquierda () {
        monsterJugadorObjeto.velocidadx = - 3

    }
    function detenerMovimiento () {
        monsterJugadorObjeto.velocidadx = 0
        monsterJugadorObjeto.velocidady = 0
    }

    function sePrecionoUnaTecla(event){
        switch (event.key) {
            case 'ArrowUp':
                moverArriba ()  
                break;
            case 'ArrowDown':
                moverAbajo ()  
                break;
            case 'ArrowLeft':
                moverIzquierda ()  
                break;
            case 'ArrowRight':
                moverDerecha ()  
                break;
            default:
                break;
        }
    }
function iniciarMapa() {

    monsterJugadorObjeto = obtenerObjetosMonster(monsterjugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePrecionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetosMonster() {
    for (let i = 0; i < monsters.length; i++) {
        if (monsterjugador === monsters [i].nombre) {
           return monsters [i]   
        }
    }
}
    
function revisarColision (enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMonster =  monsterJugadorObjeto.y
    const abajoMonster =  monsterJugadorObjeto.y +  monsterJugadorObjeto.alto
    const derechaMonster =  monsterJugadorObjeto.x +  monsterJugadorObjeto.ancho
    const izquierdaMonster =  monsterJugadorObjeto.x

    if(
        abajoMonster < arribaEnemigo ||
        arribaMonster > abajoEnemigo ||
        derechaMonster < izquierdaEnemigo ||
        izquierdaMonster > derechaEnemigo 
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    SeleccionarMonstersEnemigo(enemigo)

}


window.addEventListener('load', iniciarJuego)