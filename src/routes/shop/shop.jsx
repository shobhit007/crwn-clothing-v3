import { Route, Routes } from "react-router-dom";

import CategoriesList from "../../components/categories-list/categories.list.component";
import ProductsList from "../../components/products-list/products.list.component";

function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesList />} />
      <Route path=":categoryId" element={<ProductsList />} />
    </Routes>
  );
}

export default Shop;
