let cart = JSON.parse(localStorage.getItem('cart')) || []; //Cargar el carrito del localStorage o iniciar vacio

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // guardar el carrito en localStorage
}


function addToCart(productId) {
    const product = window.products.find(item => item.id === productId);
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }


    updateCartCount();
    updateCartDisplay();
    saveCart(); // Guardar el carrito en localStorage despues de actualizarlo
    showCartModal(product.name); //Llama a la funcion para mostrar el modal
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = `(${totalItems})`;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';// Limpiamos el contenido previo

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
    updateCartCount();
    updateCartDisplay();
    saveCart(); // Giarda el carrito en localStorage despues de actualizarlo
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

//Actualizar la visualizacion del carrito al cargar la pagina del carrito
document.addEventListener('DOMContentLoaded', updateCartDisplay);
