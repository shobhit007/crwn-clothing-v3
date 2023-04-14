import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from "./routes/Navigation/navigation";
import Home from "./routes/home/home";
import ProductDetail from "./routes/product-detail/productDetail";
import Checkout from "./routes/checkout/checkout";
import SignIn from "./routes/signin/signin";
import SignUp from "./routes/signup/signup";

import Shop from "./routes/shop/shop";

import { checkUserSession } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
