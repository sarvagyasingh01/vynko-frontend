import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ArrowUpDown,
  Download,
  Package,
  Star,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  FileText,
  ImageIcon,
  ImagesIcon,
  Upload,
  Tag,
  Save,
  X,
} from "lucide-react";
import {
  changeProductStatusRequest,
  getAllProductsRequest,
  resetProductState,
  updateProductRequest,
} from "../../features/product/productSlice";

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  formData,
  handleInputChange,
  handleSizeChange,
  isLoading,
  onSave,
  images,
  handleImageUpload,
  removeImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 bg-black/60 backdrop-blur-lg flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-6xl mx-4 h-[600px] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-lg bg-white/5 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={onClose}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Update Product</h1>
            </div>
          </div>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black font-medium rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? "Updating..." : "Update Product"}</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category} value={category} className="bg-gray-800">{category}</option>
                          ))}
                        </select>
                      </div> */}

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder="Product SKU"
                    />
                  </div> */}
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                {/* <DollarSign className="w-5 h-5 text-white" /> */}
                <h2 className="text-xl font-semibold text-white">
                  Pricing & Inventory
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div>
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
                </div>
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

            {/* Product Specifications */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Specifications
                  </h2>
                </div>
                <button
                  // onClick={addSpecification}
                  className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder="Specification name"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder="Specification value"
                    />
                    <button
                      onClick={() => removeSpecification(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      {/* <X className="w-4 h-4" /> */}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Status */}
            {/* <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Product Status
              </h3>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
              >
                <option value="active" className="bg-gray-800">
                  Active
                </option>
                <option value="draft" className="bg-gray-800">
                  Draft
                </option>
                <option value="inactive" className="bg-gray-800">
                  Inactive
                </option>
              </select>
            </div> */}

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
            {/* <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
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
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ManageProducts() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showActions, setShowActions] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultFormData = {
    name: "",
    description: "",
    category: "",
    price: 0,
    discountPrice: 0,
    sku: "",
    stock: 0,
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
  };

  const [formData, setFormData] = useState(defaultFormData);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [images, setImages] = useState([]);

  // const { products, loading, error } = useSelector((state) => state.products);
  const productState = useSelector((state) => state.products || {});
  const {
    products = [],
    productsLoading = false,
    productsError = null,
  } = productState;
  const { loading, success, error } = useSelector((state) => state.products);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
  ];
  const statuses = ["active", "inactive", "draft"];

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
        price: editingProduct.price || 0,
        discountPrice: editingProduct.discountPrice || 0,
        stock: editingProduct.stock || 0,
        sizes: {
          S: editingProduct.sizes?.S || 0,
          M: editingProduct.sizes?.M || 0,
          L: editingProduct.sizes?.L || 0,
          XL: editingProduct.sizes?.XL || 0,
          XXL: editingProduct.sizes?.XXL || 0,
          XXXL: editingProduct.sizes?.XXXL || 0,
        },
        tags: editingProduct.tags || [],
        specifications: editingProduct.specifications?.length
          ? editingProduct.specifications
          : [{ key: "", value: "" }],
      });
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const handleClose = () => {
    setIsEditModalOpen(false);
    setFormData(defaultFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // const data = new FormData();

    // // Append simple fields
    // data.append("id", editingProduct.productId);
    // data.append("name", formData.name);
    // data.append("description", formData.description);
    // data.append("category", formData.category);
    // data.append("price", formData.price);
    // data.append("discountPrice", formData.discountPrice);
    // data.append("stock", formData.stock);
    // data.append("status", formData.status);

    // // Append sizes (object with keys like S, M, L, etc.)
    // Object.entries(formData.sizes).forEach(([size, value]) => {
    //   data.append(`sizes[${size}]`, value);
    // });

    // // Append tags (assuming an array of strings)
    // formData.tags.forEach((tag, index) => {
    //   data.append(`tags[${index}]`, tag);
    // });

    // // Append images
    // images.forEach((imageObj) => {
    //   if (imageObj.file) {
    //     data.append("images", imageObj.file);
    //   }
    // });

    const updatedFormData = {
      ...formData,
      id: editingProduct.productId,
    };

    // Append images
    // images.forEach((imageObj) => {
    //   if (imageObj.file) {
    //     data.append("images", imageObj.file);
    //   }
    // });

    dispatch(updateProductRequest(updatedFormData));
    
    handleClose();
    setEditingProduct(null);
    setImages([]);
    getAllProducts();
  };

  useEffect(() => {
    if (success) {
      setIsLoading(false);
      alert("Product updated successfully!");
    }
    if (error) {
      setIsLoading(false);
      alert("Failed to add product: " + error);
    }
  }, [success, error]);

  //Image Functions
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

  const getStatusColor = (active) => {
    if (active) {
      return "bg-green-500/20 text-green-400 border-green-500/30";
    }
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getAllProducts = () => {
    dispatch(
      getAllProductsRequest({
        page,
        pageSize,
        searchTerm: searchTerm,
        searchId: searchId,
      })
    );
  };

  useEffect(() => {
    getAllProducts();
  }, [dispatch, searchTerm, searchId]);

  const handleStatusToggle = (id) => {
    console.log("ID", id)
    dispatch(changeProductStatusRequest({id}));
    getAllProducts();
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: "text-red-400", label: "Out of Stock" };
    if (stock < 10) return { color: "text-yellow-400", label: "Low Stock" };
    return { color: "text-green-400", label: "In Stock" };
  };

  // const filteredProducts = products.filter(product => {
  //   const matchesSearch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        product?.sku?.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory = !filterCategory || product.category === filterCategory;
  //   const matchesStatus = !filterStatus || product.status === filterStatus;

  //   return matchesSearch && matchesCategory && matchesStatus;
  // });

  const sortedProducts = [...products].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(sortedProducts.map((product) => product.productId));
    }
  };

  const handleBulkAction = (action) => {
    setSelectedProducts([]);
  };

  const handleProductAction = (action, productId, product) => {
    setShowActions(null);
    if (action === "edit") {
      setEditingProduct(product);
      setIsEditModalOpen(true);
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const lowStockProducts = products.filter(
    (p) => p.stock < 10 && p.stock > 0
  ).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <p className="text-gray-400 mt-1">
            Manage your product inventory and details
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black font-medium rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Products</p>
              <p className="text-2xl font-bold text-white">{activeProducts}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-white">
                {lowStockProducts}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Out of Stock</p>
              <p className="text-2xl font-bold text-white">
                {outOfStockProducts}
              </p>
            </div>
            <Package className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by Id..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value="" className="bg-gray-800">
                All Categories
              </option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value="" className="bg-gray-800">
                All Status
              </option>
              {statuses.map((status) => (
                <option key={status} value={status} className="bg-gray-800">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value="name-asc" className="bg-gray-800">
                Name A-Z
              </option>
              <option value="name-desc" className="bg-gray-800">
                Name Z-A
              </option>
              <option value="price-asc" className="bg-gray-800">
                Price Low-High
              </option>
              <option value="price-desc" className="bg-gray-800">
                Price High-Low
              </option>
              <option value="stock-asc" className="bg-gray-800">
                Stock Low-High
              </option>
              <option value="stock-desc" className="bg-gray-800">
                Stock High-Low
              </option>
              <option value="dateAdded-desc" className="bg-gray-800">
                Newest First
              </option>
              <option value="dateAdded-asc" className="bg-gray-800">
                Oldest First
              </option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction("activate")}
                  className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-sm hover:bg-green-500/30 transition-all duration-200"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction("deactivate")}
                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-all duration-200"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === sortedProducts.length &&
                      sortedProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white/50 focus:ring-2"
                  />
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Sales
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">
                  Rating
                </th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr
                    key={product.productId}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.productId)}
                        onChange={() => handleSelectProduct(product.productId)}
                        className="w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white/50 focus:ring-2"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product?.images?.[0]?.url}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-700"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {product.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Added {product.dateAdded}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{product.sku}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {product.category}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">
                        ${product.price}
                      </div>
                      {product.salePrice && (
                        <div className="text-green-400 text-sm">
                          Sale: ${product.salePrice}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`${stockStatus.color} font-medium`}>
                        {product.stock}
                      </div>
                      <div className={`${stockStatus.color} text-xs`}>
                        {stockStatus.label}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        onClick={() => handleStatusToggle(product.productId)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(
                          product.active
                        )}`}
                      >
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{product.sales}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowActions(
                              showActions === product.productId ? null : product.productId
                            )
                          }
                          className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {showActions === product.productId && (
                          <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl py-2 z-50">
                            <button
                              onClick={() =>
                                handleProductAction("view", product.productId, product)
                              }
                              className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                            <button
                              onClick={() =>
                                handleProductAction(
                                  "edit",
                                  product.productId,
                                  product
                                )
                              }
                              className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              Edit Product
                            </button>
                            <hr className="my-1 border-white/10" />
                            <button
                              onClick={() =>
                                handleProductAction("delete", product.productId, product)
                              }
                              className="w-full flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete Product
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            Showing {sortedProducts.length} of {totalProducts} products
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              Previous
            </button>
            <button className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white">
              1
            </button>
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              2
            </button>
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              3
            </button>
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleClose}
        product={editingProduct}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSizeChange={handleSizeChange}
        isLoading={isLoading}
        onSave={handleSubmit}
        images={images}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
      />
    </div>
  );
}
