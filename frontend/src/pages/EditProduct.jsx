import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(res => setProduct(res.data));
  }, [id]);

  const handleSubmit = async data => {
    await updateProduct(id, data);
    navigate("/");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        submitLabel="Update Product"
      />
    </div>
  );
}