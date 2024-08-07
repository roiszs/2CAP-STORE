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
    alert(`${product.name} ha sido añadido al carrito.`);
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = `(${totalItems})`;


}