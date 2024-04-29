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
    console.log(deck);
}

creaDeck();

// Esta función permite tomar una carta de nuestro deck
const pedirCarta = () => {
    
    let carta = '';
    let posicionCarta = 0;

    const min = Math.ceil(0);
    const max = Math.floor(deck.length-1);
    posicionCarta = Math.floor(Math.random() * (max - min) + min);

    if (deck.length === 0) {
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
//pedirCarta();


