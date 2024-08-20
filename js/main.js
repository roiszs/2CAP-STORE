document.addEventListener('DOMContentLoaded', () => {
    //Productos destacados
    const featuredProducts = [
      { id: 1, name: 'BASS PRO SHOPS', price: 800, image: '../images/Bass Pro Shops.png'},
      { id: 2, name: 'GORRA CT', price: 600, image: '../images/ct.png'},
      { id: 3, name: 'GORRA JUNIOR H', price: 600, image: '../images/junir h.png'},
      // Agregar mas productos aquí si es necesario
    ];

    //Todos los productos
    const allProducts = [
       {id: 4, name: 'SNOOP DOGG', price: 300, image: '../images/snoopdog.png' },
       {id: 5, name: 'SCARFACE RED', price:450, image: '../images/scarface2.png' },
       {id: 6, name: 'SCARFACE BLUE', price:500, image: '../images/scarface.png' },
       {id: 7, name: 'RAIDERS', price:500, image: '../images/raiders.png' },
       {id: 8, name: 'NY RED', price:700, image: '../images/nyroja.png' },
       {id: 9, name: 'NY BLUE', price:700, image: '../images/nyazul.png' },
       {id: 10, name: 'NFL ORIGINAL', price:800, image: '../images/nfl.png' },
       {id: 11, name: 'LIVERPOOL GRAY', price:600, image: '../images/liverpoolfc.png' },
       {id: 12, name: 'LIVERPOOL BLACK', price:600, image: '../images/liverpoolfc2.png' },
       {id: 13, name: 'RONALDO 7', price:400, image: '../images/cristianoronaldo.png' },
       {id: 14, name: 'SMILE', price:500, image: '../images/jokersonrisa.png' },
       {id: 15, name: 'NY JOKER', price:350, image: '../images/joker2.png' },
       {id: 16, name: 'JOKER ELEGANT', price:550, image: '../images/joker.png' },
       //Agregar mas productos aqui si es necesario
    ];

    //Hacemos los productos accesibles globalmente
    window.featuredProducts = featuredProducts;
    window.allProducts = allProducts;
    window.products = [...featuredProducts, ...allProducts];
  
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

  document.addEventListener('DOMContentLoaded', function () {
    const registroLink = document.querySelector('nav ul li a[href="registro.html"]');
    const perfilLink = document.querySelector('nav ul li a[href="perfil.html"]');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        registroLink.style.display = 'none';
        perfilLink.style.display = 'block';
    } else {
        registroLink.style.display = 'block';
        perfilLink.style.display = 'none';
    }
});

  
