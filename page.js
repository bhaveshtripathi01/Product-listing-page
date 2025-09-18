var cartCount = 0;
var cartTotal = 0;

window.onload = function() {
    setupPriceSlider();
    setupSorting();
    setupViewToggle();
    setupPagination();
    setupCart();
    addProductEvents();
};

function setupPriceSlider() {
    var slider = document.querySelector('.price-slider');
    var priceText = document.querySelector('.range-text');
    
    slider.oninput = function() {
        var value = this.value;
        var minPrice = 13.99;
        var maxPrice = parseFloat(value);
        priceText.innerHTML = 'Ranger $' + minPrice.toFixed(2) + ' - $' + maxPrice.toFixed(2);
    };
}

function setupSorting() {
    var sortSelect = document.querySelector('.sort-select');
    
    sortSelect.onchange = function() {
        var sortValue = this.value;
        sortProducts(sortValue);
    };
}

function sortProducts(sortBy) {
    var products = document.querySelectorAll('.product-card');
    var productsArray = Array.from(products);
    
    productsArray.sort(function(a, b) {
        if (sortBy === 'Price: Low to High') {
            var priceA = parseFloat(a.querySelector('.current-price').innerHTML.replace('$', ''));
            var priceB = parseFloat(b.querySelector('.current-price').innerHTML.replace('$', ''));
            return priceA - priceB;
        } else if (sortBy === 'Price: High to Low') {
            var priceA = parseFloat(a.querySelector('.current-price').innerHTML.replace('$', ''));
            var priceB = parseFloat(b.querySelector('.current-price').innerHTML.replace('$', ''));
            return priceB - priceA;
        }
    });
    
    var grid = document.querySelector('.products-grid');
    grid.innerHTML = '';
    
    for (var i = 0; i < productsArray.length; i++) {
        grid.appendChild(productsArray[i]);
    }
}

function setupViewToggle() {
    var gridBtn = document.querySelector('.grid-btn');
    var listBtn = document.querySelector('.list-btn');
    var productsGrid = document.querySelector('.products-grid');
    
    gridBtn.onclick = function() {
        productsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    };
    
    listBtn.onclick = function() {
        productsGrid.style.gridTemplateColumns = '1fr';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    };
}

function setupPagination() {
    var pageNumbers = document.querySelectorAll('.page-number');
    
    for (var i = 0; i < pageNumbers.length; i++) {
        pageNumbers[i].onclick = function() {
            for (var j = 0; j < pageNumbers.length; j++) {
                pageNumbers[j].classList.remove('active');
            }
            this.classList.add('active');
        };
    }
}

function setupCart() {
    var cart = document.querySelector('.cart');
    
    cart.onclick = function() {};
}

function addToCart(productCard) {
    cartCount++;
    var priceElement = productCard.querySelector('.current-price');
    var price = parseFloat(priceElement.innerHTML.replace('$', ''));
    cartTotal += price;
    
    updateCartDisplay();
}

function updateCartDisplay() {
    var cartText = document.querySelector('.cart-text');
    if (cartCount > 1) {
        cartText.innerHTML = 'Items $' + cartTotal.toFixed(2);
    } else {
        cartText.innerHTML = 'Item $' + cartTotal.toFixed(2);
    }
}

/* removed modal functions for simplicity */

function addProductEvents() {
    var products = document.querySelectorAll('.product-card');
    
    for (var i = 0; i < products.length; i++) {
        products[i].onmouseenter = function() {
            this.style.transform = 'translateY(-4px)';
        };
        
        products[i].onmouseleave = function() {
            this.style.transform = 'translateY(0)';
        };
        
        addToCartButton(products[i]);
    }
}

function addToCartButton(productCard) {
    var addButton = document.createElement('button');
    addButton.innerHTML = 'Add to Cart';
    addButton.style.cssText = 'background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; margin-top: 12px; width: 100%;';
    
    addButton.onclick = function(e) {
        e.stopPropagation();
        addToCart(productCard);
    };
    
    var productInfo = productCard.querySelector('.product-info');
    productInfo.appendChild(addButton);
}