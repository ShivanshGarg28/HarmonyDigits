import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial empty form values
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    collections: "",
    gender: "Unisex",
    images: [],
    isFeatured: false,
    isPublished: false,
    tags: [],
    weight: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, value) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/products");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required className="w-full border p-2" />
        <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Description" required rows={4} className="w-full border p-2" />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" className="w-full border p-2" />
          <input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} placeholder="Discount Price" className="w-full border p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} placeholder="Stock Count" className="w-full border p-2" />
          <input name="sku" value={productData.sku} onChange={handleChange} placeholder="SKU" className="w-full border p-2" />
        </div>

        <input name="category" value={productData.category} onChange={handleChange} placeholder="Category" className="w-full border p-2" />
        <input name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand" className="w-full border p-2" />
        <input value={productData.sizes.join(", ")} onChange={(e) => handleArrayChange("sizes", e.target.value)} placeholder="Sizes (comma separated)" className="w-full border p-2" />
        <input name="collections" value={productData.collections} onChange={handleChange} placeholder="Collections" className="w-full border p-2" />

        <select name="gender" value={productData.gender} onChange={handleChange} className="w-full border p-2">
          <option value="Unisex">Unisex</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>

        {/* Tags */}
        <input value={productData.tags.join(", ")} onChange={(e) => handleArrayChange("tags", e.target.value)} placeholder="Tags (comma separated)" className="w-full border p-2" />

        {/* Weight */}
        <input type="number" name="weight" value={productData.weight} onChange={handleChange} placeholder="Weight" className="w-full border p-2" />

        {/* Meta Fields */}
        <input name="metaTitle" value={productData.metaTitle} onChange={handleChange} placeholder="Meta Title" className="w-full border p-2" />
        <input name="metaDescription" value={productData.metaDescription} onChange={handleChange} placeholder="Meta Description" className="w-full border p-2" />
        <input name="metaKeywords" value={productData.metaKeywords} onChange={handleChange} placeholder="Meta Keywords" className="w-full border p-2" />

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
