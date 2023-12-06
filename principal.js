
//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
// loadEventListeners: Función que inicializa los escuchadores de eventos, como clic en productos y en productos dentro del carrito.
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

// addProduct: Función que se ejecuta cuando se hace clic en el botón "Agregar al carrito". Lee la información del producto seleccionado y la agrega al carrito.
function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

// deleteProduct: Función que elimina un producto del carrito cuando se hace clic en el botón de eliminación (X). Actualiza el precio total y la cantidad de productos en el carrito.
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

// readTheContent: Función que lee la información del producto seleccionado y la agrega al array buyThings. Si el producto ya existe en el carrito, se incrementa la cantidad en lugar de agregar un nuevo elemento.
function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

// loadHtml: Función que carga dinámicamente el contenido del carrito en el HTML. Actualiza la interfaz con la lista de productos en el carrito, el precio total y la cantidad de productos.
function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
// clearHtml: Función que borra el contenido del carrito en el HTML, utilizada para actualizar la interfaz cuando se eliminan productos.
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }

//  enviar: Función que obtiene los valores de los campos de un formulario (nombre, teléfono y correo) y muestra una alerta indicando que los datos han sido registrados. Es importante notar que en esta función hay un error de nombres de variables en la condición if (deberían ser direccion, tarjeta y correo en lugar de nombre, telefono y correo).
 function enviar() {
    // Obtener los valores de los campos
    var direccion = document.getElementById("nombre").value;
    var tarjeta = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;

 
    // Verificar si los campos están llenos
    if (nombre && telefono && correo) {
        // Mostrar la alerta de compra cancelada solo si los campos están llenos
        alert("Datos Registrados");
    }
}
 
