import { Cart } from "./pages/cart/Cart";
import { ProductList } from "./pages/productlist/product-list";

function App() {
  return (
    <main className="max-w-[1360px] mx-6 my-[3rem] flex flex-col gap-6 min-[1150px]:mx-auto">
      <div className="flex flex-col min-[1100px]:flex-row gap-6">
       
          <ProductList />
       
          <Cart />
       
      </div>
    </main>
  );
}

export default App;
