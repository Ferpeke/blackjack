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
const puntosHTML = document.querySelectorAll('small');

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
    // Usamos la funcion "shuffle" de la librería underscore para barajear nuestro deck
    deck = _.shuffle(deck);
}

creaDeck();

// Esta función permite tomar una carta de nuestro deck
const pedirCarta = () => {
    
    let carta = '';
    let posicionCarta = 0;

    const min = Math.ceil(0);
    const max = Math.floor(deck.length - 1);
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

// Eventos
btnPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugardor = puntosJugardor + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugardor;
    
});