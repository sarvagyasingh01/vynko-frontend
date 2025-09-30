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

const EditProductImages = ({
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
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-6xl mx-4 h-[600px] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-lg bg-white/5 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={onClose}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-white">
              Update Product Images
            </h1>
          </div>
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
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

                {images?.length > 0 && (
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

            {/* Update Button Below */}
            <button
              onClick={onSave}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black font-medium rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? "Updating..." : "Update Images"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default EditProductImages;
