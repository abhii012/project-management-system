import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [showModal, setShowModal] = useState(false);
 const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async id => {
      await deleteProduct(id);
      fetchProducts();
    
  };

  // 👇 PUT IT HERE
  // if (loading) return <p className="text-center mt-10">Loading...</p>;
  // if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-blue-500 min-h-screen w-full absolute ">
        <div className="bg-blue-400 h-25 w-full py-6 text-center text-2xl lg:text-4xl">Project Management System</div>
      <Link className=" relative top-10 lg:text-2xl bg-gray-400 m-10   lg:m-10 p-2 rounded-2xl" to="/add">
        Add Product
      </Link>
<div className=" flex flex-wrap  gap-2 md:gap-8 justify-center mt-20">
      {products.map(p => (
        <div className="w-38 md:w-48 bg-amber-300 p-3 rounded-md flex flex-col text-center lg:gap-3 shadow scale-100" key={p._id}>
          <div className=" text-sm lg:text-lg flex flex-col gap-1"> <div>{p.name}</div>
           <div>Price: {p.price}</div>
           <div>Category: {p.category}</div>
            {(p.inStock)? "inStock":"out of Stock" } </div>
          <div className="flex justify-around text-lg py-2">
          <Link className="text-sm lg:text-lg ml-3 text-blue-600" to={`/edit/${p._id}`}>
            Edit
          </Link>
          <button
            className="text-sm lg:text-lg ml-3 text-gray-200 bg-red-600 px-1 rounded-md"
        onClick={() => {
         setSelectedProduct(p);
         setShowModal(true);
      }}
          >
            Delete
          </button>
          </div>
        </div>
      ))}
      {showModal && (
  <div className="  fixed inset-0 flex items-center justify-center bg-black/50 z-50">

    <div className="scale-60 lg:scale-100 bg-white p-6 rounded-lg shadow-lg w-96">

      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to delete?
      </h2>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            handleDelete(selectedProduct._id);
            setShowModal(false);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>

      </div>
    </div>

  </div>
)}
      </div>
    </div>
  );
}