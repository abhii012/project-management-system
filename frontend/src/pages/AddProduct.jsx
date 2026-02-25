import ProductForm from "../components/ProductForm";
import { createProduct } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = async data => {
    await createProduct(data);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Add Product"
      />
    </div>
  );
}