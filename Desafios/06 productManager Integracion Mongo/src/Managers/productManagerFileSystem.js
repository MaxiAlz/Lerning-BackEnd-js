import fs from 'fs'

export class ProductManagerFileSystem {
  constructor(_path) {
    this.path = _path

    this.#init()
  }
  #init() {
    try {
      const existFile = fs.existsSync(this.path)
      if (existFile) return

      fs.writeFileSync(this.path, JSON.stringify([]))

    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    const response = await fs.promises.readFile(this.path, 'utf-8')
    return JSON.parse(response);
  }

  async saveProduct({ tittle, description, price, code }) {
    const newProduct = { tittle, description, price, code }

    const products = await this.getProducts()

    const existCode = products.some(product => product.code === code)

    if (existCode) {
      throw new Error('El codigo ya existe')
    }

    newProduct.id = !products.length ? 1 : products[products.length - 1].id + 1

    products.push(newProduct)

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

    return newProduct
  }
}

// new ProductManagerFileSystem("prod")
// export default{ProductManagerFileSystem}