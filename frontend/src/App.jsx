import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;