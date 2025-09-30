import { useEffect, useState } from "react";
import {
  Upload,
  X,
  Plus,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  DollarSign,
  Package,
  Tag,
  FileText,
} from "lucide-react";
import {
  addProductRequest,
  resetProductState,
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    active: false,
    sizes: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
    },
    tags: [],
    specifications: [{ key: "", value: "" }],
  });

  const [images, setImages] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            url: event.target.result,
            name: file.name,
            file: file,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target; // name will be like "S", "M", etc.
    setFormData((prevData) => ({
      ...prevData,
      sizes: {
        ...prevData.sizes,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    // Append simple fields
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("stock", formData.stock);
    data.append("status", formData.status);

    // Append sizes (object with keys like S, M, L, etc.)
    Object.entries(formData.sizes).forEach(([size, value]) => {
      data.append(`sizes[${size}]`, value);
    });

    // Append tags (assuming an array of strings)
    formData.tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag);
    });

    // Append images
    images.forEach((imageObj) => {
      if (imageObj.file) {
        data.append("images", imageObj.file);
      }
    });

    dispatch(addProductRequest(data));
  };

  useEffect(() => {
    if (success) {
      setIsLoading(false);
      alert("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        discountPrice: "",
        sku: "",
        stock: "",
        status: "active",
        tags: [],
        specifications: [{ key: "", value: "" }],
      });

      setImages([]);
      dispatch(resetProductState());
    }
    if (error) {
      setIsLoading(false);
      alert("Failed to add product: " + error);
      dispatch(resetProductState());
    }
  }, [success, error]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-white/5 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Add New Product</h1>
            <p className="text-gray-400 mt-1">
              Create a new product for your store
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black font-medium rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isLoading ? "Saving..." : "Save Product"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Package className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <DollarSign className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">
                Pricing & Inventory
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Regular Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Sale Price
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0"
                />
              </div> */}
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-xl font-semibold text-white">Sizes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  S
                </label>
                <input
                  type="number"
                  name="S"
                  value={formData.sizes.S}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  M
                </label>
                <input
                  type="number"
                  name="M"
                  value={formData.sizes.M}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  L
                </label>
                <input
                  type="number"
                  name="L"
                  value={formData.sizes.L}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  XL
                </label>
                <input
                  type="number"
                  name="XL"
                  value={formData.sizes.XL}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  XXL
                </label>
                <input
                  type="number"
                  name="XXL"
                  value={formData.sizes.XXL}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  XXXL
                </label>
                <input
                  type="number"
                  name="XXXL"
                  value={formData.sizes.XXXL}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  step="1"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Status */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Product Status
            </h3>
            <select
              name="active"
              value={formData.active}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value={true} className="bg-gray-800">
                Active
              </option>
              <option value={false} className="bg-gray-800">
                Inactive
              </option>
            </select>
          </div>

          {/* Product Images */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <ImageIcon className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Product Images
              </h3>
            </div>

            <div className="space-y-4">
              <label className="block">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    Click to upload images
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="space-y-2">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="text-gray-300 text-sm truncate">
                          {image.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Tags */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">Tags</h3>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="Add tag"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
