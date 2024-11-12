let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerRes = null;
let segRes = null;
let movimientos = 0;
let aciertos = 0;
let temp = false;
let timer = 120;
let tiempoReg = null;
let timerInicial = timer;

let idReset=null;
let reset=false;


// Apuntando al HTML
let mostrarMov = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t_restante');


//funcion de reseteo
function reiniciarJuego() {
    // Reiniciar variables de juego
    tarjetasDestapadas = 0;
    movimientos = 0;
    aciertos = 0;
    timer = timerInicial;
    temp = false;

    // Actualizar la interfaz de usuario
    mostrarMov.innerHTML = "Movimientos: 0";
    mostrarAciertos.innerHTML = "Aciertos: 0";
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    // Detener el temporizador si está en curso
    clearInterval(tiempoReg);

    // Mezclar las tarjetas de nuevo
    numeros = numeros.sort(() => Math.random() - 0.5);
    console.log(numeros); // Puedes usar esto para verificar que se están mezclando correctamente

    // Limpiar el contenido de todas las tarjetas y habilitarlas
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = "";
        tarjeta.disabled = false;
    }
}

// Función principal
function destapar(id) {
    if (!temp) {
        contarTime();
        temp = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        // Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerRes = numeros[id];
        tarjeta1.innerHTML = primerRes;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        // Mostrar el segundo número
        tarjeta2 = document.getElementById(id);
        segRes = numeros[id];
        tarjeta2.innerHTML = segRes;
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMov.innerHTML = `Movimientos: ${movimientos}`;

        // Comprobar si las tarjetas coinciden
        if (primerRes == segRes) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            // Verificar si el usuario ha ganado
            if (aciertos == 8) {
                clearInterval(tiempoReg);
                mostrarTiempo.innerHTML = `¡Ganaste en ${timerInicial - timer} segundos!`;
            }
        } else {
            // Volver a ocultar las tarjetas después de un breve retraso
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

function contarTime() {
    tiempoReg = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if (timer === 0) {
            clearInterval(tiempoReg);
            bloqueoTarjetas();  // Bloquear todas las tarjetas al finalizar el tiempo
            mostrarTiempo.innerHTML = "Tiempo agotado. Juego terminado.";
        }
    }, 1000);
}

function bloqueoTarjetas() {
    for (let i = 0; i < numeros.length; i++) {
        let tarjetaBloq = document.getElementById(i.toString());
        tarjetaBloq.innerHTML = numeros[i]; // Revelar el número en la tarjeta
        tarjetaBloq.disabled = true; // Bloquear la tarjeta
    }
}
