const addButton = document.getElementById('add-product-button'); /// html ko addButton element select garcha
const deleteAllButton = document.getElementById('delete-all-products'); /// delete button element
const productList = document.getElementById('product-list'); /// ul list element
const productInput = document.getElementById('product-name'); /// form ko input element
const products = [];

/// add product
function addProduct() {
  const product = productInput.value; /// product ko form bata ligeko input value
  if (productInput.value !== '') {
    /// empty huda add huna nadine but alert dekhaune
    products.push(product); /// tyo value products array ma push/add gareko
    updateProductList();
    productInput.value = ''; /// add vaye pachi form ko input field empty gareko
  } else {
    alert('Product name cannot be empty'); /// empty vaye yo alert show garcha
  }
}

/// load products
function loadProducts() {
  updateProductList();
}

function updateProductList() {
  productList.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    /// hamlai jati ota prodcut cha tesko each ko ul element banunu parne vayera loop rakheko
    const product = products[i];

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = product;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      deleteProduct(product);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
      editProduct(i);
    });

    span.appendChild(deleteButton);
    span.appendChild(editButton);
    li.appendChild(span);
    productList.appendChild(li);
  }
}

/// delete all products
function deleteAllProducts() {
  products.splice(0);
  updateProductList();
}

function editProduct(index) {
  const currentProductName = products[index];
  const newProductName = prompt(
    'Enter the new product name:',
    currentProductName
  );
  if (newProductName !== null) {
    products[index] = newProductName;
    updateProductList();
  }
}

function deleteProduct(index) {
  products.splice(index, 1);
  updateProductList();
}

window.onload = loadProducts;
deleteAllButton.addEventListener('click', deleteAllProducts);
addButton.addEventListener('click', addProduct);
