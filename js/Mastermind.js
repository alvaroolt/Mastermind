/**
 * Sigue los siguientes pasos:
 * Utilizando closures; créate un objeto MasterMind al que puedas invocar los siguientes métodos:
 *      MasterMind.init(): genera una combinación objetivo. Será la que el jugador debe adivinar.
 *      MasterMind.mostrar(): muestra la combinación objetivo por consola. Os facilitará a la hora
 *      de hacer pruebas
 *      MasterMind.comprobarCoincidencia(intento): genera una combinación de negros (número de bolas 
 *      que están en su sitio) y blancos (número de bolas que están; pero no en su sitio).
 * Después genera el entorno gráfico tal y como aparece en la app
 *      Habrá ocho colores distintos
 *      Cada combinación constará de 4 bolas
 *      Los colores pueden repetirse
 *      Cuando se llegue al acierto (4 bolas negras) se le dará opción de comenzar de nuevo (otra combinación objetivo nueva) o salir (despedida)
 *      Los colores se colocan en cada clic; de izquierda a derecha si hay huecos
 *      Los colores desaparecen en cada clic si está colocado.
 *      La comprobación se realiza mediante un botón similar al de la aplicación
 */

Mastermind = (function () {
    let arrayColores = ["yellow","blue","#FFFFFF","brown","orange","#000000","red","green"];

    let arraySolucion = []; 

    let init = () => {
        arraySolucion = [];
        for (let i = 0; i < 4; i++) {
            arraySolucion.push(arrayColores[getRandomInt(0, 8)]);
        }
    }

    let mostrar = () => {
        return console.log(arraySolucion);
    }

    let comprobarCoincidencia = (intento) => {
        let comprobacion = [];
        let restantesIntento = [];
        let restantesSolucion = [];

        //calculo de negros
        for (i = 0; i < arraySolucion.length; i++) {
            if (intento[i] == arraySolucion[i]) {
                comprobacion.push("#000000");
            } else {
                restantesIntento.push(intento[i]);
                restantesSolucion.push(arraySolucion[i]);
            }
        }
        //calculo de blancos
        for (i = 0; i < restantesIntento.length; i++) {
            if (restantesSolucion.indexOf(restantesIntento[i]) != -1) {
                comprobacion.push("#FFFFFF");
                restantesSolucion[restantesSolucion.indexOf(restantesIntento[i])] = undefined;
            } else {
                comprobacion.push("rgb(128,128,128)");
            }
        }
        return comprobacion.sort();
    }

    let getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        init: init,
        mostrar: mostrar,
        comprobar: comprobarCoincidencia
    };
})();