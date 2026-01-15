import { useEffect, useState } from "react";
import EditBannerImagesModal from "./EditBannerImagesModal";
import axios from "../../utils/axios";

export default function ManageBanners() {
  const [banner, setBanner] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [editingBanner, setEditingBanner] = useState(null);
  const [imageType, setImageType] = useState(null); // "desktop" | "mobile"
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    headerText: "",
    headerActive: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // ================= FETCH BANNER =================
  const getBanners = async () => {
    try {
      const response = await axios.get("/fetch-banner");
      setBanner(response.data); // assuming single banner
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      alert("Failed to fetch banners");
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  // ================= HEADER EDIT =================
  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      headerText: banner.headerText || "",
      headerActive: banner.headerActive || false,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingBanner(null);
    setFormData({ headerText: "", headerActive: false });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleHeaderSave = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("admin_token");

      await axios.post("/private/update-header", formData, {
        headers: { "x-auth-token": token },
        withCredentials: true,
      });

      alert("Header updated successfully!");
      getBanners();
      handleCloseEdit();
    } catch (error) {
      alert("Failed to update header");
    } finally {
      setIsLoading(false);
    }
  };

  // ================= IMAGE MODAL =================
  const openImageEditor = (banner, type) => {
    setEditingBanner(banner);
    setImageType(type);

    const currentImages =
      type === "desktop" ? banner.desktopImage : banner.mobileImage;

    setImages(
      (currentImages || []).map((img) => ({
        id: img.public_id,
        url: img.url,
        name: img.public_id,
        file: null, // existing image
      }))
    );

    setIsImageModalOpen(true);
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
            file,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleBannerImagesSave = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("type", imageType);

      images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      const token = localStorage.getItem("admin_token");

      await axios.post("/private/update-banner-images", formData, {
        headers: { "x-auth-token": token },
        withCredentials: true,
      });

      alert("Banner images updated!");
      getBanners();
      setIsImageModalOpen(false);
    } catch (error) {
      alert("Failed to update banner images");
    } finally {
      setIsLoading(false);
    }
  };

  if (!banner) return null;

  return (
    <div className="px-6 pb-6 pt-2 space-y-6">
      <h1 className="text-3xl font-bold text-white">Manage Banners</h1>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        {/* Desktop Image */}
        
        <div className="relative mt-4">
          <span className="text-white text-lg text-center">Dekstop Banners</span>
          <img
            src={banner.desktopImage?.[0]?.url}
            alt="Desktop"
            className="w-full h-32 object-cover rounded"
          />
          <button
            onClick={() => openImageEditor(banner, "desktop")}
            className="absolute top-0 right-0 bg-white text-gray-800 px-2 py-1 text-sm rounded-md"
          >
            Edit
          </button>
        </div>

        {/* Mobile Image */}
        <div className="relative mt-12">
          <span className="text-white text-lg text-center">Mobile Banners</span>
          <img
            src={banner.mobileImage?.[0]?.url}
            alt="Mobile"
            className="w-full h-24 object-cover rounded"
          />
          <button
            onClick={() => openImageEditor(banner, "mobile")}
            className="absolute top-0 right-0 bg-white text-gray-800 px-2 py-1 text-sm rounded-md"
          >
            Edit
          </button>
        </div>

        <p className="mt-12 text-gray-300 bg-gray-800 border px-4 py-2 rounded text-center">
          {banner.headerText || "N/A"}
        </p>

        <p className="mt-8 text-center">
          <span
            className={`px-4 py-2 rounded text-white ${
              banner.headerActive ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {banner.headerActive ? "Active" : "Inactive"}
          </span>
        </p>

        <button
          onClick={() => handleOpenEdit(banner)}
          className="mt-6 px-4 py-2 bg-white text-black rounded-lg"
        >
          Edit Header
        </button>
      </div>

      {/* HEADER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-bold text-white mb-4">Edit Header</h2>

            <input
              type="text"
              name="headerText"
              value={formData.headerText}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 rounded bg-white/10 text-white"
            />

            <label className="text-gray-300">
              <input
                type="checkbox"
                name="headerActive"
                checked={formData.headerActive}
                onChange={handleInputChange}
                className="mr-2"
              />
              Header Active
            </label>

            <button
              onClick={handleHeaderSave}
              className="mt-4 px-4 py-2 bg-white text-black rounded"
            >
              Save
            </button>

            <button
              onClick={handleCloseEdit}
              className="absolute top-3 right-3 text-gray-400"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* IMAGE MODAL */}
      <EditBannerImagesModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={images}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        onSave={handleBannerImagesSave}
        isLoading={isLoading}
        type={imageType}
      />
    </div>
  );
}
