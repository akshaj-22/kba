const items = {
    "Fridge": { price: 180512, name: "Laptop" },
    "Watch": { price: 20999, name: "Mobile Phone" },
    "Phone": { price: 16999, name: "Tablet" },
    "TV": { price: 15240, name: "Television" },
    "Earphone": { price: 2500, name: "Smart Watch" }
};

const cart = new Map();

function addToCart() {
    const itemSelect = document.getElementById('itemSelect');
    const quantityInput = document.getElementById('quantityInput');
    
    const selectedItem = itemSelect.value;
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        if (cart.has(selectedItem)) {
            cart.get(selectedItem).quantity += quantity;
        } else {
            cart.set(selectedItem, { quantity, price: items[selectedItem].price, name: items[selectedItem].name });
        }
        updateCart();
    } else {
        alert('Please enter a valid quantity.');
    }
}

function updateCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    cartTableBody.innerHTML = '';

    let totalCartValue = 0;

    cart.forEach((item, key) => {
        const itemTotal = item.price * item.quantity;
        totalCartValue += itemTotal;

        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>&#8377;${item.price.toFixed(2)}</td>
            <td>&#8377;${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart('${key}')" class="remove">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    document.getElementById('totalCartValue').innerText = totalCartValue.toFixed(2);
}

function removeFromCart(itemKey) {
    cart.delete(itemKey);
    updateCart();
}
