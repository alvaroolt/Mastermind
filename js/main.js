/**
 * Después genera el entorno gráfico tal y como aparece en la app
 * Habrá ocho colores distintos
 * Cada combinación constará de 4 bolas
 * Los colores pueden repetirse
 * Cuando se llegue al acierto (4 bolas negras) se le dará opción de comenzar de nuevo (otra combinación objetivo nueva) o salir (despedida)
 * Los colores se colocan en cada clic; de izquierda a derecha si hay huecos
 * Los colores desaparecen en cada clic si está colocado.
 * La comprobación se realiza mediante un botón similar al de la aplicación
 */

{
    var colores;
    let circulosComprobar;
    let botonComprobar;
    //let filaComprobar;
    let copia;

    let init = () => {
        Mastermind.init();
        copia = document.getElementById("aComprobar").cloneNode(true);
        circulosComprobar = Array.from(document.getElementById("aCColores").getElementsByTagName("circle"));
        colores = Array.from(document.getElementById("colores").getElementsByTagName("img"));
        botonComprobar = document.getElementById("check");

        colores.forEach(element => {
            element.addEventListener("click", colorcarColor);
        });
        circulosComprobar.forEach(element => {
            element.addEventListener("click", sacarColor);
        });
        botonComprobar.addEventListener("click", comprobar);
    }

    document.addEventListener("DOMContentLoaded", init);

    let colorcarColor = (event) => {
        for (circulo of circulosComprobar) {
            if (circulo.getAttribute("fill") == "rgb(128,128,128)") {
                circulo.setAttribute("fill", `${event.target.getAttribute("id")}`);
                return;
            }
        }
    }

    let sacarColor = (event) => {
        if (event.target.parentNode.parentNode.parentNode.previousSibling != document.getElementById("aComprobar")) {
            if (event.target.getAttribute("fill") != "rgb(128,128,128)") {
                event.target.setAttribute("fill", `rgb(128,128,128)`);
            }
        }
    }

    let comprobar = () => {
        if (todasColocadas() == 4) {
            let resultado = document.getElementById("comprobacion").getElementsByTagName("circle");
            let comprueba = [];
            circulosComprobar.forEach(element => {
                comprueba.push(element.getAttribute("fill"));
            });
            let comprobacion = Mastermind.comprobar(comprueba);

            for (let i = 0; i < 4; i++) {
                resultado[i].setAttribute("fill", `${comprobacion[i]}`);
            }

            if (comprobacion != ["#000000", "#000000", "#000000", "#000000"]) {
                document.getElementById("comprobaciones").insertBefore(copia, document.getElementById("aComprobar"));
                copia = document.getElementById("aComprobar").cloneNode(true);
                circulosComprobar = Array.from(document.getElementById("aCColores").getElementsByTagName("circle"));
                circulosComprobar.forEach(element => {
                    element.addEventListener("click", sacarColor);
                });
            }
        }
    }

    let todasColocadas = () => {
        let colocada = 0;
        for (circulo of circulosComprobar) {
            if (circulo.getAttribute('fill') != 'rgb(128,128,128)') {
                colocada++;
            }
        }
        return colocada;
    }
    
}