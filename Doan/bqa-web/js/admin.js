// Add Product Handler
function handleAddProduct(event) {
    event.preventDefault();

    // Get form values
    const productName = document.getElementById('productName').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const rating = document.getElementById('rating').value;
    const image = document.getElementById('image').files[0];

    // Validate form
    if (!productName || !brand || !price || !quantity || !description || !category || !rating || !image) {
        alert('Vui lòng điền đầy đủ tất cả các trường!');
        return false;
    }

    // Create product object
    const product = {
        id: Date.now(),
        name: productName,
        brand: brand,
        price: price,
        quantity: quantity,
        description: description,
        category: category,
        rating: rating,
        image: URL.createObjectURL(image)
    };

    // Get existing products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Add new product
    products.push(product);
    
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Show success message
    alert('Sản phẩm đã được thêm thành công!');

    // Reset form
    document.getElementById('productForm').reset();

    // Refresh products list
    displayProducts();
}

// Display Products
function displayProducts() {
    const productsList = document.getElementById('productsList');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    productsList.innerHTML = '';

    if (products.length === 0) {
        productsList.innerHTML = '<p style="text-align: center; width: 100%;">Chưa có sản phẩm nào được thêm.</p>';
        return;
    }

    products.forEach(product => {
        const stars = Array(parseInt(product.rating))
            .fill('<i class="fas fa-star"></i>')
            .join('');

        const productHTML = `
            <div class="pro">
                <img src="${product.image}" alt="${product.name}">
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        ${stars}
                    </div>
                    <h4>$${product.price}</h4>
                    <small>Số lượng: ${product.quantity}</small>
                </div>
                <a href="#" onclick="removeProduct(${product.id}); return false;">
                    <i class="fal fa-trash cart"></i>
                </a>
            </div>
        `;
        productsList.innerHTML += productHTML;
    });
}

// Remove Product
function removeProduct(productId) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        alert('Sản phẩm đã được xóa!');
    }
}

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
});