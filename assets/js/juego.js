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
    console.log(deck);
}

creaDeck();