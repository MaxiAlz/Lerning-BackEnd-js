class PruductManager {

  constructor() {
    this._productos = []
  }

  createId = () => {
    const idProducto = (this._productos.length > 0) ? this._productos[this._productos.length - 1].id + 1 : 1
    return idProducto
  }
  addProducts = (tittle, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.createId(),
      tittle,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    if (!product.tittle || !product.description || !product.thumbnail || !product.price || !product.code || !product.stock) {
      return console.log("¡Error,todos los campos son requeridos!");
    }
    if (this._productos.find( (productInList) =>  productInList.code === product.code )) {
      return console.log('el codigo ya se encuentra en la lista');
    } else this._productos.push(product)
  }

  getProducts = () => {
    // devolver los elementos del arreglo
    if (!this._productos.length) {
      return console.log('Lista de productos vacia');
    } else console.log(this._productos)
  }

  getProductByID =(idProduct)=>{
    const productFounded = this._productos.find(producto => producto.id === idProduct)
    if(productFounded){
      console.log(`se encontro el siguiente producto con el id ${idProduct} :`, productFounded);
    }else console.log('Not Found');
  }
}

const cosa = new PruductManager


