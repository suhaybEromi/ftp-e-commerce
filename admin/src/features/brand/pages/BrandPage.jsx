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
import brandLocale from "../locale/brand";
import { authContext } from "../../../contexts/AuthContext";

export default function BrandPage() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch functionality.
  const fetchBrands = async () => {
    try {
      const res = await getBrands(
        `/?search=${encodeURIComponent(searchQuery)}`,
      );
      setBrands(res.brands || []);
    } catch (err) {
      toast.error(brandLocale?.messages?.fetchError || getErrorMessage(err));
      console.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [searchQuery]);

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

      // Editing data, first way.
      if (editingBrand?._id) {
        await toast.promise(updateBrand(editingBrand?._id, formData), {
          loading: brandLocale?.messages?.updating,
          success: brandLocale?.messages?.updated,
          error: err => getErrorMessage(err),
        });

        // Editing data, second way.
        // const res = await updateBrand(editingBrand?._id, formData);
        // toast.success(res.message || "Brand updated successfully");
      } else {
        // Added data,(first way).
        await toast.promise(createBrand(formData), {
          loading: brandLocale?.messages?.creating,
          success: brandLocale?.messages?.created,
          error: err => getErrorMessage(err),
        });

        // Second Way.
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

  // Delete functionality.
  const handleDelete = async id => {
    const ok = window.confirm("Are you sure you want to delete this brand?");
    if (!ok) return;

    try {
      await toast.promise(deleteBrand(id), {
        loading: brandLocale?.messages?.deleting,
        success: brandLocale?.messages?.deleted,
        error: err => getErrorMessage(err),
      });

      await fetchBrands();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  // Close modal functionality.
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
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search by name..."
          className="me-4 w-100 bg-white text-black px-4 py-2 rounded-lg outline-0"
        />

        <button
          onClick={handleOpenCreate}
          className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          {brandLocale?.addTitleBrand}
        </button>

        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          title={
            editingBrand
              ? brandLocale?.editTitleBrand
              : brandLocale?.addTitleBrand
          }
          size="md"
        >
          <BrandForm
            initialValues={editingBrand}
            activeLang={activeLang}
            onSubmit={handleSave}
            loading={loading}
            isEdit={!!editingBrand}
            onCancelEdit={handleCloseModal}
          />
        </ModalDesign>
      </div>

      {/* Display brand product. */}
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
