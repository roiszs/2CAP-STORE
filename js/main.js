document.addEventListener('DOMContentLoaded', () => {
    //Productos destacados
    const featuredProducts = [
      { id: 1, name: 'Bass Pro Shops', price: 10.00, image: '../images/Bass Pro Shops.png'},
      { id: 2, name: 'Gorra CT', price: 20.00, image: '../images/ct.png'},
      { id: 3, name: 'Gorra Junior H', price: 30.00, image: '../images/junir h.png'},
      // Agregar mas productos aquí si es necesario
    ];

    //Todos los productos
    const allProducts = [
       {id: 4, name: '2CAP', price:25.00, image: '../images/Bass Pro Shops.png' },
       {id: 5, name: '2CAP', price:25.00, image: '../images/ct.png' },
       {id: 6, name: '2CAP', price:25.00, image: '../images/junir h.png' },
       //Agregar mas productos aqui si es necesario
    ];
  
    //Mostrar productos destacados
   const productsContainer = document.getElementById('products');
   featuredProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
   });

    //Mostrar todos los productos
    const allProductsContainer = document.getElementById('all-products');
    allProducts.forEach(product => {
      const productElement = createProductElement(product);
      allProductsContainer.appendChild(productElement);
    });

    function createProductElement(product) {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        return productElement;
    }
  
  });
  
