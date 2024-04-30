/**Referencia del nombre de cada carta.*/
/** 
 * 2C  = Two of Clubs (Tréboles).
 * 2D  = Two of Diaminds (Diamantes).
 * 2H  = Two of Hearts (Corazones).
 * 2S  = Two of Spades (Espadas).
*/

let deck = [];
const  tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugardor = 0,
    puntosComputadora = 0;

// Rerefecias del HTML
const btnPedirCarta = document.querySelector('#btnPedirCarta');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

btnNuevoJuego.disabled = true;

// Esta función permite crear un nuevo deck
const creaDeck = () => {

    for( i = 2; i <= 10; i++ ) {
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }    
    console.log(deck);
    // Usamos la funcion "shuffle" de la librería underscore para barajear nuestro deck
    deck = _.shuffle(deck);
}

creaDeck();

// Esta función permite tomar una carta de nuestro deck
const pedirCarta = () => {
    
    let carta = '';
    let posicionCarta = 0;

    const min = 0
    const max = deck.length - 1;
    posicionCarta = Math.floor(Math.random() * (max - min) + min);

    if(deck.length === 0) {
        throw 'No hay más cartas en el deck';
    } else {
        for (let i = 0; i <= deck.length; i++){
            if(posicionCarta == i) {
                carta = deck[i];
                deck.splice(i, 1);
                break;
            }
        }
    }
    return carta;
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1); // tomar solo el valor de la carta. Ejemplo carta = '2D' solo tomamos el primer valor (2). o ya sea una letra como 'AD', se toma A.
    // valores de las cartas 2 = 2, 3 = 3, 4 = 4 ..., A = 11, J = 10, Q = 10, K = 10.
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
            : parseInt(valor);
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        // Si los puntos del jugador son mayores a 21, ya no es necesario seguir con el ciclo, con uno basta.
        if(puntosMinimos > 21) {
            break;
        } else if(puntosComputadora === 21) {
            break;
        }

    } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21 ));

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :|');
        } else if(puntosMinimos > 21) {
            alert('¡Computadora Gana!');
        } else if((puntosComputadora > puntosMinimos) && (puntosComputadora <= 21)){
            alert('¡Computadora Gana!');
        } else {
            alert('¡Genial, ganaste!');
        }
    }, 200);

    btnNuevoJuego.disabled = false;
}

// Eventos
btnPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta();

    btnNuevoJuego.disabled = true;

    puntosJugardor = puntosJugardor + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugardor;

    // Logica o funcionalidad para colocar la carta que salión de nuestro deck en el HTML(jugador).
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    
    if(puntosJugardor > 21) {
        console.warn('!Lo siento mucho, perdiste!');
        btnNuevoJuego.disabled = false;
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);
        
    } else if( puntosJugardor === 21) {
        console.log('¡Genial, 21!');
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);
    }

});

btnDetener.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugardor);
});
btnNuevoJuego.addEventListener('click', () => {
    
    btnNuevoJuego.disabled = true;

    puntosJugardor = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerText = '';
    divCartasJugador.innerText = '';

    btnDetener.disabled = false;
    btnPedirCarta.disabled = false;
    
});