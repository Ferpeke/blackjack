const miModulo = (() => {
    'use strict'

    let deck = [];
    const  tipos = ['C','D','H','S'], 
           especiales = ['A','J','Q','K'];
    
    let puntosJugadores = [];
    
    // Rerefecias del HTML
    const btnPedirCarta = document.querySelector('#btnPedirCarta'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small');

    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;

    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = creaDeck();
        puntosJugadores = [];

        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '' );

        btnDetener.disabled = false;
        btnPedirCarta.disabled = false;
        btnNuevoJuego.disabled = true;
    }
    // Esta función permite crear un nuevo deck
    const creaDeck = () => {

        deck = [];
        for(let i = 2; i <= 10; i++ ) {
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
        return _.shuffle(deck);
    }
      
    // Esta función permite tomar una carta de nuestro deck
    const pedirCarta = () => {
        
        let carta = '',
        posicionCarta = 0;
        const min = 0,
        max = deck.length + 1;
        
        //Obtenemos el valor de la carta aleatoriamente del deck ya bajareados previamente.
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

    // Turno: 0 = primer jugador y el último de la computadora.
    const acomularPuntos = ( carta, turno ) => {
        puntosJugadores[turno]  = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
    }
    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acomularPuntos(carta, (puntosJugadores.length -1));
            crearCarta(carta, (puntosJugadores.length - 1));

            // Si los puntos del jugador son mayores a 21, ya no es necesario seguir con el ciclo, con uno basta.
            if(puntosMinimos > 21) {
                break;
            } else if(puntosComputadora === 21) {
                break;
            }
    
        } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21 ) );
        btnNuevoJuego.disabled = false;
        determinarGanador();
    }
    
    // Eventos
    btnPedirCarta.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugardor = acomularPuntos(carta, 0);
        btnNuevoJuego.disabled = true;
        
        // Logica o funcionalidad para colocar la carta que salión de nuestro deck en el HTML(jugador).
        crearCarta(carta, 0);
        
        if(puntosJugardor > 21) {
            btnNuevoJuego.disabled = false;
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugardor);
            
        } else if( puntosJugardor === 21) {
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugardor);
        }
    
    });
    
    btnDetener.addEventListener('click', () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    btnNuevoJuego.addEventListener('click', () => {
        // btnNuevoJuego.disabled = true;
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        console.clear();
        inicializarJuego();        
    });

    return {
        nuevoJuego : inicializarJuego,
    };
})();
