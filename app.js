document.addEventListener("DOMContentLoaded", function() {
    mostrarMenu();
    // Inicialización de Swiper
    var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
});


function mostrarMenu() {
    // Array de productos con sus precios
    const menu = [
        { nombre: "Pan de Masa Madre", precio: 3.50 },
        { nombre: "Baguette Tradicional", precio: 2.00 },
        { nombre: "Croissant de Mantequilla", precio: 1.50 },
        { nombre: "Pan Brioche", precio: 4.00 },
        { nombre: "Pain au Chocolat", precio: 2.50 },
        { nombre: "Pan de Avena y Miel", precio: 3.00 },
        { nombre: "Focaccia con Romero y Sal Marina", precio: 4.50 },
        { nombre: "Pan Integral de Semillas", precio: 3.50 },
        { nombre: "Pan de Centeno", precio: 3.00 },
        { nombre: "Galletas de Avena y Pasas", precio: 1.00 }
    ];

    // Mostrar el menú al usuario directamente
    let mensaje = 
        "Bienvenido a Drakkar, selecciona un producto del menú:\n" +
        "1. Pan de Masa Madre - $3.50\n" +
        "2. Baguette Tradicional - $2.00\n" +
        "3. Croissant de Mantequilla - $1.50\n" +
        "4. Pan Brioche - $4.00\n" +
        "5. Pain au Chocolat - $2.50\n" +
        "6. Pan de Avena y Miel - $3.00\n" +
        "7. Focaccia con Romero y Sal Marina - $4.50\n" +
        "8. Pan Integral de Semillas - $3.50\n" +
        "9. Pan de Centeno - $3.00\n" +
        "10. Galletas de Avena y Pasas - $1.00\n" +
        "0. Finalizar pedido\n" +
        "99. Cancelar pedido";

    let total = 0;
    let pedido = [];

    // Bucle para seleccionar productos
    while (true) {
        let seleccion = parseInt(prompt(mensaje));

        // Condición para finalizar el pedido
        if (seleccion === 0) {
            break;
        }

        // Condición para cancelar el pedido
        if (seleccion === 99) {
            if (confirm("¿Seguro que quieres abandonar tu carrito?")) {
                alert("Has cancelado tu pedido.");
                return;
            } else {
                continue;
            }
        }

        // Validar la selección del usuario
        if (seleccion >= 1 && seleccion <= menu.length) {
            let productoSeleccionado = menu[seleccion - 1];
            pedido.push(productoSeleccionado);
            total += productoSeleccionado.precio;
            alert("Has agregado " + productoSeleccionado.nombre + " al carrito. Total hasta ahora: $" + total.toFixed(2));
        } else {
            alert("Selección no válida, por favor elige un número del menú.");
        }
    }

    // Mostrar el resumen del pedido
    if (pedido.length > 0) {
        let resumen = "Tu pedido:\n";
        for (let i = 0; i < pedido.length; i++) {
            resumen += "- " + pedido[i].nombre + " - $" + pedido[i].precio.toFixed(2) + "\n";
        }
        resumen += "Total a pagar: $" + total.toFixed(2);
        alert(resumen);
    } else {
        alert("No has seleccionado ningún producto.");
    }
}


