import { useState, useEffect } from "react";

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    inStock: true
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
  if (!form.name.trim()) return "Name is required";

  if (!isNaN(form.name)) return "Name cannot be a number";

  if (!/^[a-zA-Z\s]+$/.test(form.name))
    return "Name must contain only letters";

  if (!form.price || form.price <= 0)
    return "Price must be positive";

  if (!form.category.trim())
    return "Category is required";

  return "";
};

  const handleSubmit = async e => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="min-h-screen w-full bg-blue-500 flex items-center justify-center p-4"
>
  <div className="lg:w-[70%] lg:h-[70vh] max-w-md bg-blue-600 rounded-lg p-6 sm:p-8 shadow scale-80 lg:scale-100">

    <h1 className="text-xl sm:text-2xl lg:text-3xl text-center text-white mb-6">
      {submitLabel}
    </h1>

    {error && <p className="text-red-200 mb-4">{error}</p>}

    <div className="flex flex-col gap-4 lg:py-15">

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="bg-gray-200 p-2 rounded w-full"
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="bg-gray-200 p-2 rounded w-full"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="bg-gray-200 p-2 rounded w-full"
      />

      <label className="text-white flex items-center gap-2">
        <input
          type="checkbox"
          name="inStock"
          checked={form.inStock}
          onChange={handleChange}
        />
        In Stock
      </label>

      <button
        className="bg-green-500 p-2 rounded text-white mt-10"
        disabled={loading}
      >
        {loading ? "Processing..." : submitLabel}
      </button>

    </div>
  </div>
</form>
  );
}