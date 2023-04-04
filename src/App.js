import { Route, Routes } from "react-router-dom";

import Navigation from "./routes/Navigation/navigation";
import Home from "./routes/home/home";
import ProductDetail from "./routes/product-detail/productDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
