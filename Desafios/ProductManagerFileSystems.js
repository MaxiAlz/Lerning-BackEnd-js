const fs = require('fs')

class ProductManager {

  constructor(path) {
    this._path = path
    this.initial()
  }
  // verificar si existe el archivo
  initial() {
    try {
      // si ya existe
      if (fs.existsSync(this._path)) return
      // si no existe lo inicializo con []
      if (!fs.existsSync(this._path)) {
        fs.writeFileSync(this._path, JSON.stringify([]))   //stringify convierte un valor a JSON y parse Convierte un JSON a otra cosa
      }
    } catch (error) {
      console.log(error);
    }
  }


  addProducts = async (tittle, description, price, thumbnail, code, stock) => {
    try {
      // aca obtengo todos los productos que hay en el archivo para sobreescribirlo
      const allProducts = await this.getProducts()
      // allProducts = []
      const idProducto = await allProducts.length > 0 ? allProducts[allProducts.length - 1].id + 1 : 1

      // creo modelo del objeto que se va a enviar
      const product = {
        id: idProducto,
        tittle,
        description,
        price,
        thumbnail,
        code,
        stock
      }
      // compruebo que alguno de los campos no este vacio, ya que todos con obligatorios
      if (!product.tittle || !product.description || !product.thumbnail || !product.price || !product.code || !product.stock) {
        return console.log("¡Error,todos los campos son requeridos!");
      }
      // compruebo si el codigo que ingreso ya existe, por que no puede haber 2 codigos iguales
      if (allProducts.find(productInList => productInList.code === product.code)) {
        return console.log('Error! El codigo de producto ingresado ya existe')
      } else allProducts.push(product)

      // aca sobreescribo el archivo con la nueva informacion
      await fs.promises.writeFile(this._path, JSON.stringify(allProducts))

      return product

    } catch (error) {
      console.log(error);
    }
  }

  getProducts = async () => {
    try {
      // leer archivo, asumiendo que existe...
      if (fs.existsSync(this._path)) {
        const response = await fs.promises.readFile(this._path, 'utf-8')
        // console.log(JSON.parse(response))
        return JSON.parse(response)
      } else console.log('No hay archivo de productos');
    }
    catch (error) {
      console.log(error);
    }
  }

  getProductByID = async (idProduct) => {
    try {
      const productsList = await fs.promises.readFile(this._path, 'utf-8')
      const productFounded = JSON.parse(productsList).find(producto => producto.id === idProduct)
      if (productFounded) {
        // console.log(`se encontro el siguiente producto con el id ${idProduct}:`, productFounded);
        return productFounded
      }
      if (!productFounded) {
        console.log(`No se encontro producto con el id: ${idProduct}`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // metodo update:
  updateProduct = async (idProduct, dataUpdate) => {
    // obtener el producto a actualizar
    const productToUpdate = await this.getProductByID(idProduct)

    // const actualizar = []
    // desestructuro objeto que me manda
    const { tittle, description, price, thumbnail, code, stock } = dataUpdate
    const updated = { ...productToUpdate, tittle, description, price, thumbnail, code, stock }
    // si el producto existe,actualizo
    // if (productToUpdate) {
      const allProducts = await this.getProducts()
      // recorro el arreglo y filtro el que no tiene el id
      const productosfiltrados = allProducts.filter(product => product.id !== productToUpdate.id)
      const actualizar = productosfiltrados.push(updated)

      // return actualizar
    // }
    console.log(actualizar);
  }
  // debe recibir el id y el campo a actualizar, puede ser el objeto completo tambien no debe borrar el id
  // fmetodo delete
  deleteProduct = async (idProduct) => {
    // obtener producto a borrar
    const productToDelete = await this.getProductByID(idProduct)
    // si el producto existe lo borro
    if (productToDelete) {
      // obtener todos los productos
      const allProducts = await this.getProducts()
      // recorrer el arreglo y filtrar el producto que se va a borrar
      const productsFilter = allProducts.filter(product => product.id !== productToDelete.id)
      // actualizar el archivo con los datos filtrados
      await fs.promises.writeFile(this._path, JSON.stringify(productsFilter))
      // console.log('van a quedar estos:' ,productsFilter);
      console.log('se borro el siguinte producto: ', productToDelete.tittle);
    }
    // si no existe mando un error
    if (!productToDelete) return console.log('Error al borrar producto');
  }
}



const test1 = new ProductManager('./productos.json')

const dataUpdate = {
  tittle: "celular",
  description: "celular samsung",
  price: 100,
  thumbnail: "sin imagen",
  code: "celu123",
  stock: 15
}
// console.log('getProducts: ',test1.getProducts())
// console.log(test1.getProductByID(2))
console.log(test1.updateProduct(3, dataUpdate))
// console.log(test1.deleteProduct(2))
// console.log(test1.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25));
// console.log(test1.addProducts('computadora Dell', 'Computadora dell 4212', 200, 'Sin imagen', 'asd123', 4));