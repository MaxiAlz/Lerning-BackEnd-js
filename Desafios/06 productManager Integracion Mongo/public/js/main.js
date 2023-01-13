// alert("hola pa!")
const socket = io()

const productsContainer = document.getElementById("products-table-body")
const createProductForm = document.getElementById("create-product-form")
const formtittle = document.getElementById("titulo-form").values

console.log(createProductForm);
socket.on("products", products => {
  const allProducts = products.map(product =>
    `
    <tr>
      <th scope="row">${product.id}</th>
      <td>${product.tittle}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td><img
      src=${product.thumbnail}
      alt=${product.thumbnail}
      height="72px"
      width="72px"
    /></td>
</tr>
    `
  )
    .join(" ");

  productsContainer.innerHTML = allProducts;
});


const getDatos = async () => {
  const titulo = document.getElementById("titulo-form").value
  const descripcion = document.getElementById("Descripcion-form").value
  const precio = document.getElementById("precio-form").value
  const codigo = document.getElementById("codigo-form").value
  const stock = document.getElementById("stock-form").value

  const producto = {
    tittle: titulo,
    description: descripcion,
    price: precio,
    code: codigo,
    thumbnail:"Sin Imagen",
    stock: stock
  }

  await fetch('/api/products', {
    body: JSON.stringify(producto),
    // body: await productModel.create(producto),
    method: 'POST',
    headers:{
      "Content-type": "application/json"
    }
  })

  
}



// createProductForm.addEventListener('submit', (e)=>{
//   e.preventDefault()

//   const formData = new FormData(createProductForm)

//   console.log(e.target);
//   console.log(formtittle);
//   for (const field of formData.entries()) {
//     console.log(field);
//   }
// })