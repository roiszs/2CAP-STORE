document.addEventListener('DOMContentLoaded', () => {
    window.products = [
      { id: 1, name: 'Bass Pro Shops', price: 10.00, image: '../images/Bass Pro Shops.png'},
      { id: 2, name: 'Gorra CT', price: 20.00, image: '../images/ct.png'},
      { id: 3, name: 'Gorra Junior H', price: 30.00, image: '../images/junir h.png'},
    ];
  
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
      `;
      productsContainer.appendChild(productElement);
    });
  });
  
