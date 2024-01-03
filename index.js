/// selecting frontEnd elements
const addButton = document.getElementById('add-product-button');
const deleteAllButton = document.getElementById('delete-all-products');
const productList = document.getElementById('product-list');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productDescriptionInput = document.getElementById('product-description');
const productQuantityInput = document.getElementById('product-quantity');

const products = [];

/// add product
function addProduct() {
  const productName = productNameInput.value;
  const productPrice = parseInt(productPriceInput.value); // since all form input values are always in string in HTML, parsing these into integer value
  const productDescription = productDescriptionInput.value;
  const productQuantity = parseInt(productQuantityInput.value);

  // creates objects only if fields are not empty, also price and quantity need to be numbers else shows alert
  if (
    productName !== '' &&
    !isNaN(productPrice) &&
    !isNaN(productQuantity) &&
    productDescription !== ''
  ) {
    // creating new object for each product
    const product = {
      name: productName,
      price: productPrice,
      description: productDescription,
      quantity: productQuantity,
    };

    products.push(product);
    updateProductList();
    clearFormInputs();
  } else {
    alert('Fields cannot be empty and price/quantity must be numbers.');
  }
}

// clear form inputs
function clearFormInputs() {
  productNameInput.value = '';
  productPriceInput.value = '';
  productDescriptionInput.value = '';
  productQuantityInput.value = '';
}

// update product list
function updateProductList() {
  productList.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.innerHTML = `
      Product Name: ${product.name} <br>
      Price: Rs.${product.price} <br>
      Quantity: ${product.quantity} <br>
      Total: Rs.${product.price * product.quantity}
    `;

    const editButton = document.createElement('button');
    editButton.textContent = 'Update';
    editButton.addEventListener('click', function () {
      editProduct(i);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      deleteProduct(i);
    });

    span.appendChild(deleteButton);
    span.appendChild(editButton);
    li.appendChild(span);
    productList.appendChild(li);
  }
}

// edit product
function editProduct(index) {
  const currentProduct = products[index];

  // Update the input fields with the current product information
  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productDescriptionInput.value = currentProduct.description;
  productQuantityInput.value = currentProduct.quantity;

  // deletes the currently editing product from list
  products.splice(index, 1);
  updateProductList();
}

// deletes the selected product
function deleteProduct(index) {
  products.splice(index, 1);
  updateProductList();
}

// deletes all products
function deleteAllProducts() {
  products.length = 0;
  updateProductList();
}

window.onload = updateProductList;
deleteAllButton.addEventListener('click', deleteAllProducts);
addButton.addEventListener('click', addProduct);
