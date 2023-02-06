import FormCreateProduct from './Components/FormCreateProduct'
import { Navbar } from './Components/Navbar'
import ProductsTable from './Components/ProductsTable'

function App() {

  return (
    <div className="App">
      <Navbar />
      <FormCreateProduct />
      <ProductsTable />
    </div>
  )
}

export default App
