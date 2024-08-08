let cart = [];

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }


    updateCartCount();
    showCartModal(product.name); //Llama a la funcion para mostrar el modal
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = `(${totalItems})`;
}

function showCartModal(productName) {
    const modal = document.getElementById('cart-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.querySelector('.close-btn');

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