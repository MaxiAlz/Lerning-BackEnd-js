import productModel from "../Models/product.model";

export class ProductManager {
  constructor(_path) {
    this.path = _path

    // this.#init()
  }

  async getProducts(){
    const response = await productModel.find().lean()
    return JSON.parse(response);
  }

  async saveProduct(){}

}