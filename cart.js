$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(product) {
        if (product.id && product.name && !isNaN(product.price)) {
            cart.push(product);
            updateLocalStorage();
            alert('Producto añadido al carrito!');
            updatePaymentButtonState(); // Actualiza el estado del botón al agregar producto
        } else {
            alert('Producto no válido.');
        }
    }

    $('.add-to-cart').click(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const price = parseFloat($(this).data('price'));
        const product = { id, name, price };

        addToCart(product);
    });

    function updatePaymentButtonState() {
        const paymentButton = $('#select-payment');
        if (cart.length === 0) {
            paymentButton.prop('disabled', true); // Asegura que el botón esté deshabilitado
        } else {
            paymentButton.prop('disabled', false); // Asegura que el botón esté habilitado
        }
    }

    function showCart() {
        let cartContent = '<h2>Mi Carrito</h2><table>';
        cartContent += '<tr><th>Producto</th><th>Precio</th><th>Acción</th></tr>';
        let total = 0;

        cart.forEach(function(product, index) {
            if (product.id && product.name && !isNaN(product.price)) {
                cartContent += `<tr>
                                <td>${product.name}</td>
                                <td>$${product.price.toFixed(2)}</td>
                                <td><button class="remove-from-cart" data-index="${index}"><i class="fas fa-trash"></i></button></td>
                                </tr>`;
                total += product.price;
            }
        });

        cartContent += `<tr><td>Total</td><td>$${total.toFixed(2)}</td><td></td></tr>`;
        cartContent += `</table>`;
        $('#cart-content').html(cartContent);
        updatePaymentButtonState(); // Actualiza el estado del botón al mostrar el carrito
        $('#cart-modal').show();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateLocalStorage();
        showCart();
        updatePaymentButtonState(); // Asegura que el estado del botón se actualice al eliminar productos
    }

    $('#view-cart').click(function(event) {
        event.preventDefault();
        showCart();
    });

    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        removeFromCart(index);
        updatePaymentButtonState(); // Asegura que el estado del botón se actualice al eliminar productos
    });

    function showCustomerInfoModal() {
        $('#cart-modal').hide(); // Cierra el modal del carrito
        $('#customer-info-modal').css('visibility', 'visible').show(); // Abre el modal de información del cliente
    }

    $('#select-payment').click(function() {
        if (cart.length > 0) {
            showCustomerInfoModal();
            $('#proceed-to-payment').prop('disabled', false); // Habilitar el botón "Proceder al Pago"
        }
    });

    $('#close-cart').click(function() {
        $('#cart-modal').hide(); // Cierra el modal del carrito
    });

    $('#close-customer-info-modal').click(function() {
        $('#customer-info-modal').css('visibility', 'hidden').hide();
    });

    $('#proceed-to-payment').click(function() {
        $('#customer-info-modal').css('visibility', 'hidden').hide();
        $('#payment-modal').css('visibility', 'visible').show(); // Muestra el modal de métodos de pago
    });

    // Función para cerrar el modal de métodos de pago
    $('#close-payment-modal').click(function() {
        $('#payment-modal').css('visibility', 'hidden').hide();
    });

    // Función para cerrar el modal de Depósito Bancario
    $('#close-bank-deposit-modal').click(function() {
        $('#bank-deposit-modal').css('visibility', 'hidden').hide();
    });

    // Función para cerrar el modal de Transferencia Bancaria
    $('#close-bank-transfer-modal').click(function() {
        $('#bank-transfer-modal').css('visibility', 'hidden').hide();
    });

    // Función para cerrar el modal de Pago Contra Entrega
    $('#close-cod-modal').click(function() {
        $('#cod-modal').css('visibility', 'hidden').hide();
    });

    // Función para mostrar el modal de Depósito Bancario
    $('#bank-deposit-btn').click(function() {
        $('#payment-modal').css('visibility', 'hidden').hide(); // Cierra el modal de métodos de pago
        $('#bank-deposit-modal').css('visibility', 'visible').show(); // Abre el modal de depósito bancario
    });

    // Función para mostrar el modal de Transferencia Bancaria
    $('#bank-transfer-btn').click(function() {
        $('#payment-modal').css('visibility', 'hidden').hide(); // Cierra el modal de métodos de pago
        $('#bank-transfer-modal').css('visibility', 'visible').show(); // Abre el modal de transferencia bancaria
    });

    // Función para mostrar el modal de Pago Contra Entrega
    $('#cod-btn').click(function() {
        $('#payment-modal').css('visibility', 'hidden').hide(); // Cierra el modal de métodos de pago
        $('#cod-modal').css('visibility', 'visible').show(); // Abre el modal de pago contra entrega
    });

    // Mostrar mensaje de éxito al enviar el pedido (depósito bancario)
    $('#send-order-btn').click(function() {
        alert('¡Su pedido fue enviado con éxito!');
        // Aquí puedes añadir cualquier lógica adicional que necesites al enviar el pedido
    });

    // Mostrar mensaje de éxito al enviar el pedido (transferencia bancaria)
    $('#send-order-btn-transfer').click(function() {
        alert('¡Su pedido fue enviado con éxito!');
        // Aquí puedes añadir cualquier lógica adicional que necesites al enviar el pedido
    });

    // Mostrar mensaje de éxito al enviar el pedido (pago contra entrega)
    $('#send-order-btn-cod').click(function() {
        alert('¡Su pedido fue enviado con éxito!');
        // Aquí puedes añadir cualquier lógica adicional que necesites al enviar el pedido
    });

    // Cerrar modales al hacer clic fuera de ellos
    $(window).click(function(event) {
        if ($(event.target).is('#customer-info-modal')) {
            $('#customer-info-modal').css('visibility', 'hidden').hide(); // Cierra el modal de información del cliente
        } else if ($(event.target).is('#payment-modal')) {
            $('#payment-modal').css('visibility', 'hidden').hide(); // Cierra el modal de métodos de pago
        } else if ($(event.target).is('#bank-deposit-modal')) {
            $('#bank-deposit-modal').css('visibility', 'hidden').hide(); // Cierra el modal de depósito bancario
        } else if ($(event.target).is('#bank-transfer-modal')) {
            $('#bank-transfer-modal').css('visibility', 'hidden').hide(); // Cierra el modal de transferencia bancaria
        } else if ($(event.target).is('#cod-modal')) {
            $('#cod-modal').css('visibility', 'hidden').hide(); // Cierra el modal de pago contra entrega
        }
    });

    // Asegurarse de que los modales estén ocultos y no visibles al cargar la página
    $('#customer-info-modal').css('visibility', 'hidden').hide();
    $('#payment-modal').css('visibility', 'hidden').hide();
    $('#bank-deposit-modal').css('visibility', 'hidden').hide();
    $('#bank-transfer-modal').css('visibility', 'hidden').hide();
    $('#cod-modal').css('visibility', 'hidden').hide();

    // Al cargar la página, asegurarse de que el botón esté en el estado correcto
    updatePaymentButtonState();
});
