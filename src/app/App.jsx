import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Carrinho from "@/pages/Carrinho";
import { CartProvider } from "@/features/cart/CartContext";
import Header from "@/components/shared/Header";
import ProductPage from "@/pages/ProductPage";

function App() {
  return (
    <div className="bg-[#F2F2F2]">
      <CartProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/products/:id"
              element={<ProductPage></ProductPage>}
            ></Route>
            <Route path="/carrinho" element={<Carrinho></Carrinho>}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
