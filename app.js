let cart = [];
let total = 0;
function addToCart(productName, productPrice) {
    if (typeof productPrice !== 'number' || isNaN(productPrice)) {
        console.error("Invalid product price:", productPrice);
        return; 
    }
    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCartCount();
    alert("Has agregado " + productName + " al carrito.");
    guardarCarrito();
}
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}
function openModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    total = 0;
    cart.forEach(item => {
        if (typeof item.price === 'number') {
            const li = document.createElement('li');
            li.innerText = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(li);
            total += item.price;
        } else {
            console.error("Invalid price for item:", item);
        }
    });
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    document.getElementById('cart-modal').style.display = 'block';
}
function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
}
function finalizarCompra() {
    alert("Compra finalizada. Gracias por su compra!");
    cart = [];
    total = 0;
    updateCartCount();
    closeModal();
    guardarCarrito();
}
function guardarCarrito() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}
function cargarCarrito() {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        cart.forEach(item => {
            if (typeof item.price !== 'number' || isNaN(item.price)) {
                console.error("Invalid price for item:", item);
            }
        });
        updateCartCount();
    }
}
cargarCarrito();