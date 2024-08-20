let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar el carrito del localStorage o iniciar vacío

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en localStorage
}

function addToCart(productId) {
    const product = window.products.find(item => item.id === productId);
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(); // Guardar el carrito en localStorage después de actualizarlo
    updateCartCount();
    updateCartDisplay();
    showCartModal(product.name); // Llama a la función para mostrar el modal
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = `(${totalItems})`;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ''; // Limpiamos el contenido previo

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Precio: $${item.price.toFixed(2)}</p>
                        <p>Cantidad: ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})">Eliminar</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }

        updateCartTotal();
    }
}

function updateCartTotal() {
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cartTotalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    saveCart(); // Guardar el carrito en localStorage después de actualizarlo
    updateCartCount();
    updateCartDisplay();
}

function showCartModal(productName) {
    const modal = document.getElementById('cart-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.querySelector('.close-btn1');

    modalMessage.textContent = `${productName} ha sido añadido al carrito.`;
    modal.style.display = "block";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// Asegurar que el carrito se actualice al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    updateCartDisplay();

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Capturar los valores del formulario
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCVC = document.getElementById('card-cvc').value;
        const address = document.getElementById('address').value;

        if (!cardNumber || !cardName || !cardExpiry || !cardCVC || !address) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Guardar la información de la compra en localStorage (simulación)
        const order = {
            cart,
            cardNumber,
            cardName,
            cardExpiry,
            cardCVC,
            address,
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        };

        localStorage.setItem('order', JSON.stringify(order));

        // Mostrar el mensaje de agradecimiento y ocultar el formulario de pago
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';

        // Limpiar el carrito y redirigir a la página de inicio después de un tiempo
        setTimeout(function() {
            localStorage.removeItem('cart');
            updateCartDisplay();
            window.location.href = 'index.html';
        }, 3000); // 3 segundos antes de redirigir
    });
});

// Capturar los valores del formulario de pago
function capturePaymentDetails() {
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const address = document.getElementById('address').value;

    if (!cardNumber || !cardName || !cardExpiry || !address) {
        alert('Por favor, complete todos los campos.');
        return false; // Prevenir la acción si faltan campos
    }

    // Guardar los datos en localStorage
    const paymentDetails = {
        cardNumber: cardNumber.replace(/.(?=.{4})/g, '*'), // Ocultar los primeros dígitos de la tarjeta
        cardName,
        cardExpiry,
        address
    };

    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    return true;
}

function capturePaymentDetails() {
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const address = document.getElementById('address').value;

    if (!cardNumber || !cardName || !cardExpiry || !address) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    const paymentDetails = {
        cardNumber: cardNumber.replace(/.(?=.{4})/g, '*'), // Oculta los primeros dígitos de la tarjeta
        cardName,
        cardExpiry,
        address
    };

    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    return true;
}

function displayPaymentDetails() {
    const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

    if (paymentDetails) {
        document.getElementById('saved-card-name').textContent = `Nombre en la tarjeta: ${paymentDetails.cardName}`;
        document.getElementById('saved-card-number').textContent = `Número de la tarjeta: ${paymentDetails.cardNumber}`;
        document.getElementById('saved-card-expiry').textContent = `Fecha de expiración: ${paymentDetails.cardExpiry}`;
        document.getElementById('saved-address').textContent = `Dirección: ${paymentDetails.address}`;
        document.getElementById('payment-details').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    updateCartDisplay();
    displayPaymentDetails(); // Mostrar detalles de pago guardados

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (capturePaymentDetails()) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('El carrito está vacío.');
                return;
            }

            // Mostrar mensaje de agradecimiento y ocultar el formulario
            document.getElementById('payment-form').style.display = 'none';
            document.getElementById('thank-you-message').style.display = 'block';

            // Limpiar el carrito después de la compra
            setTimeout(function () {
                localStorage.removeItem('cart');
                localStorage.removeItem('paymentDetails');
                updateCartDisplay();
                window.location.href = 'index.html';
            }, 3000);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Asumiendo que hay una función para actualizar el total del carrito
    function updateCartTotal() {
        // Implementa la lógica para actualizar el total del carrito
        const total = 0; // Reemplaza con el cálculo real
        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
    }

    // Agregar evento al formulario de pago
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Implementa la lógica para procesar el pago
        document.getElementById('thank-you-message').style.display = 'block';
    });

    updateCartTotal();
});

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    updateCartDisplay();
    displayPaymentDetails(); // Mostrar detalles de pago guardados

    // Evento para actualizar los detalles de pago
    document.getElementById('payment-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        if (capturePaymentDetails()) {
            // Mostrar mensaje de agradecimiento y ocultar el formulario
            document.getElementById('payment-form').style.display = 'none';
            document.getElementById('thank-you-message').style.display = 'block';

            // Limpiar el carrito y redirigir a la página de inicio después de un tiempo
            setTimeout(function () {
                localStorage.removeItem('cart');
                localStorage.removeItem('paymentDetails');
                updateCartDisplay();
                window.location.href = 'index.html';
            }, 3000); // 3 segundos antes de redirigir
        }
    });
});

function capturePaymentDetails() {
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const address = document.getElementById('address').value;

    if (!cardNumber || !cardName || !cardExpiry || !address) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    const paymentDetails = {
        cardNumber: cardNumber.replace(/.(?=.{4})/g, '*'), // Oculta los primeros dígitos de la tarjeta
        cardName,
        cardExpiry,
        address
    };

    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    updatePaymentDetailsDisplay();
    return true;
}

function updatePaymentDetailsDisplay() {
    const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

    if (paymentDetails) {
        document.getElementById('saved-card-name').textContent = `Nombre en la tarjeta: ${paymentDetails.cardName}`;
        document.getElementById('saved-card-number').textContent = `Número de la tarjeta: ${paymentDetails.cardNumber}`;
        document.getElementById('saved-card-expiry').textContent = `Fecha de expiración: ${paymentDetails.cardExpiry}`;
        document.getElementById('saved-address').textContent = `Dirección: ${paymentDetails.address}`;
        document.querySelector('.payment-details').style.display = 'block'; // Asegura que la sección esté visible
    }
}

