import { useEffect, useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import BrandForm from "../components/BrandForm";
import BrandProduct from "./BrandProduct";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../../services/brand.service";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function BrandPage() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);

  // Fetch functionality.
  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.brands || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Add and Update functionality.
  const handleSave = async values => {
    try {
      setLoading(true);

      const formData = new FormData();

      // Get data.
      formData.append("name[en]", values.name.en);
      formData.append("name[ar]", values.name.ar);
      formData.append("name[ku]", values.name.ku);
      formData.append("isActive", String(values.isActive));
      if (values.brandImage) {
        formData.append("brandImage", values.brandImage);
      }

      // Editing data, first way
      if (editingBrand?._id) {
        await toast.promise(updateBrand(editingBrand?._id, formData), {
          loading: "Updating brand...",
          success: "Brand updated successfully",
          error: err => getErrorMessage(err),
        });

        // Editing data, second way
        // const res = await updateBrand(editingBrand?._id, formData);
        // toast.success(res.message || "Brand updated successfully");
      } else {
        // Added data,(first way)
        await toast.promise(createBrand(formData), {
          loading: "Create brand...",
          success: "Brand added successfully",
          error: err => getErrorMessage(err),
        });

        // Second Way
        // const res = await createBrand(formData);
        // toast.success(res.message || "Brand created successfully");
      }
      await fetchBrands();
      handleCloseModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // If click edit button display data inside input.
  const handleEdit = brand => {
    setEditingBrand({
      _id: brand._id,
      name: {
        en: brand?.name?.en || "",
        ar: brand?.name?.ar || "",
        ku: brand?.name?.ku || "",
      },
      brandImage: undefined,
      isActive: brand?.isActive ?? true,
      previewImage: brand?.images?.[0]?.url
        ? `${import.meta.env.VITE_API_URL_IMG}${brand.images[0].url}`
        : "",
    });
    setOpen(true);
  };

  // Delete functionality
  const handleDelete = async id => {
    const ok = window.confirm("Ae you sure you want to delete this brand?");
    if (!ok) return;

    try {
      await toast.promise(deleteBrand(id), {
        loading: "Deleting brand...",
        success: "Brand deleted successfully",
        error: err => getErrorMessage(err),
      });

      await fetchBrands();
    } catch (error) {
      toast(getErrorMessage(error));
    }
  };

  // Close model functionality
  const handleCloseModal = () => {
    setOpen(false);
    setEditingBrand(null);
  };

  // Open modal functionality.
  const handleOpenCreate = () => {
    setEditingBrand(null);
    setOpen(true);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={handleOpenCreate}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          Add Brand
        </button>

        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          title={editingBrand ? "Edit Brand" : "Add Brand"}
          size="md"
        >
          <BrandForm
            initialValues={editingBrand}
            activeLang={activeLang}
            setActiveLang={setActiveLang}
            onSubmit={handleSave}
            loading={loading}
            isEdit={!!editingBrand}
            onCancelEdit={handleCloseModal}
          />
        </ModalDesign>
      </div>

      {/* Display brand product */}
      <div className="my-7">
        <BrandProduct
          brands={brands}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
