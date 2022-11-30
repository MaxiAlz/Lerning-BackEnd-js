const fs = require("fs");

class ProductManagerFilesystem {
  // nos pide que la clase reciba la ruta / path del archivo donde guardaremos los productos
  constructor(path) {
    // en el constructor podemos inicializar variables de la clase, y darle un valor, cada instancia tendra el suyo
    this.path = path;

    // Para invocar el método al crear la instancia, podemos llamarlo desde acá
    this.init();
  }

  // Podemos definir un primer metodo para saber si el archivo en ese path existe, y que si no, se cree al iniciar la instancia
  init() {
    try {
      const existFile = fs.existsSync(this.path);
      if (existFile) return;

      // Si no existe, ya lo inicializamos con un array vacio
      fs.writeFileSync(this.path, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }

  // Definimos uno de los métodos solicitados
  async getProducts() {
    try {
      // leemos el archivo (asumiendo que existe, o podriamos verificarlo)
      // y convertimos la respuesta a JS con JSON.parse
      const response = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }

  async saveProduct({ title, description, price, code }) {
    try {
      // Validamos producto (aunque esto ya es más del desafio anterior)
      if (!title || !description || !price || !code)
        return { error: "Las variables son obligatorias" };

      const newProduct = { title, description, price, code };
      // vamos a buscar el array de products, para no hacer el readfile aca podemos reutilizar el metodo getProducts
      const products = await this.getProducts();

      newProduct.id = !products.length ? 1 : products[products.length - 1].id + 1;

      products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3));

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
}

// Creamos una instancia
// Y simplemente al hacer el new, se va a ejecutar el metodo init que creara el archivo si no existe
const electronicProducts = new ProductManagerFilesystem(
  "./electronic-products.json"
);

// Creamos otra como para entender que nos sirve el this path para poder manejar varios archivos
const foodProducts = new ProductManagerFilesystem("./food-products.json");

// acá vayan comentando y descomentando el codigo para ir probando
const testClass = async () => {
  // guardaremos un producto
  //   const productOneSaved = await electronicProducts.saveProduct({
  //     code: "CCC333",
  //     title: "Ipad",
  //     description: "Tablet",
  //     price: 700,
  //   });

  //console.log({ productOneSaved });

  // uno más

  //   const productTwoSaved = await electronicProducts.saveProduct({
  //     code: "MMM222",
  //     title: "Mac",
  //     description: "Laptop",
  //     price: 1200,
  //   });

  //   console.log({ productTwoSaved });

  // obtenemos todos para ver si se ven bien
  const allProducts = await electronicProducts.getProducts();
  console.log(allProducts);
};

testClass();