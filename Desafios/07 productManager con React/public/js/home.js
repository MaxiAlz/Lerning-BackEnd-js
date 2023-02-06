
alert('toy en home')

const sendDataNewProduct = async () => {
  console.log("hola")

  const nameProduct = document.getElementById("nameProduct").value
  const descriptioProduct = document.getElementById("descriptioProduct").value
  const price = document.getElementById("price").value
  const thumbnailProduct = document.getElementById("thumbnailProduct").value
  const codeProduct = document.getElementById("codeProduct").value
  const stockProduct = document.getElementById("stockProduct").value
  const categoryProduct = document.getElementById("categoryProduct").value



  const newProduct = {
    tittle: nameProduct,
    description: descriptioProduct,
    price: price,
    thumbnail: thumbnailProduct,
    code: codeProduct,
    stock: stockProduct,
    category: categoryProduct
  }



  await fetch('/api/products', {
    body: JSON.stringify(newProduct),
    // body: await productModel.create(producto),
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    }
  })
}