// --------- FUNCION PARA CAMBIAR PRECIO SEGUN MEDIDA (COMPLETO)
document.addEventListener('DOMContentLoaded', function() {
    // *** BLOQUE 1: MANEJO DEL PRECIO SEGÚN SELECCIÓN DE MEDIDA ***
    const dimensionSelect = document.getElementById('dimension-select');
    const precioElement = document.getElementById('precioIni');

    // Extraer el precio inicial desde el HTML
    const originalPrice = parseFloat(precioElement.textContent.replace(/[^0-9.-]+/g, ""));

    // Lista de porcentajes para cada opción
    const incrementos = [0.30, 0.25, 0.20, 0.15, 0.10]; // PORCENTAJES DE AUMENTO AL INICIAL
    // VALUE 0 = ORIG + 30%
    // VALUE 1 = (ORIG + 30%) + 25%
    // VALUE 2 = ((ORIG + 30%) + 25%) + 15%
    // Y ASI CON LOS DEMAS

    // Función para formatear el número con separadores de miles y decimales
    const formatNumber = (num) => {
        return num.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

    // Función para calcular el nuevo precio basado en el índice seleccionado
    const calcularPrecio = (index) => {
        let nuevoPrecio = originalPrice;

        // Aplicamos los incrementos según el índice
        for (let i = 0; i < index && i < incrementos.length; i++) {
            nuevoPrecio *= 1 + incrementos[i];
        }

        return nuevoPrecio;
    };

    // Mostrar $ --- al cargar la página
    precioElement.textContent = '$ ---';

    // Actualiza el precio cuando el usuario cambia la opción en el select
    dimensionSelect.addEventListener('change', function() {
        const selectedOption = parseInt(dimensionSelect.value); // Obtiene el índice seleccionado

        if (isNaN(selectedOption)) {
            // Si no se selecciona ninguna opción válida, muestra $ ---
            precioElement.textContent = '$ ---';
        } else {
            const nuevoPrecio = calcularPrecio(selectedOption);
            precioElement.textContent = `$${formatNumber(nuevoPrecio)}`;
        }
    });

    // *** BLOQUE 2: MANEJO DE BOTONES DE COLOR (MADERA) ***
    const woodButtons = document.querySelectorAll('.btn-color');
    const woodColorDisplay = document.getElementById('selected-wood-color');

    // Función para actualizar visualmente el botón seleccionado
    function actualizarSeleccion(btns, botonSeleccionado) {
        btns.forEach(button => {
            button.classList.remove('active'); // Remover clase 'active' de todos los botones
        });
        botonSeleccionado.classList.add('active'); // Agregar clase 'active' al botón seleccionado
    }

    woodButtons.forEach(button => {
        button.addEventListener('click', function() {
            woodColorDisplay.textContent = button.dataset.color;
            actualizarSeleccion(woodButtons, button); // Actualiza visualmente los botones
        });
    });

    // *** BLOQUE 3: MANEJO DE BOTONES DE COLOR (HIERRO) ***
    const ironButtons = document.querySelectorAll('.btn-color-iron');
    const ironColorDisplay = document.getElementById('selected-iron-color');

    ironButtons.forEach(button => {
        button.addEventListener('click', function() {
            ironColorDisplay.textContent = button.dataset.color;
            actualizarSeleccion(ironButtons, button); // Actualiza visualmente los botones
        });
    });

    // *** BLOQUE 4: MANEJO DE CANTIDAD ***
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');
    const quantityInput = document.getElementById('quantity-input');

    minusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    plusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
    });
});