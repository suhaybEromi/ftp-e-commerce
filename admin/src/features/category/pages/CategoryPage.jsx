import { useEffect, useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import CategoryForm from "../components/CategoryForm";
import CategoryProduct from "./CategoryProduct";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../services/category.service";
import categoryLocale from "../locale/category";

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [editingCategories, setEditingCategories] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategory = async () => {
    try {
      const res = await getCategory(
        `/?search=${encodeURIComponent(searchQuery)}`,
      );
      setCategories(res.category || []);
    } catch (err) {
      toast.error(categoryLocale?.messages?.fetchError || getErrorMessage(err));
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [searchQuery]);

  const handleSave = async values => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name[en]", values.name.en);
      formData.append("name[ar]", values.name.ar);
      formData.append("name[ku]", values.name.ku);
      formData.append("isActive", String(values.isActive));
      if (values.categoryImage) {
        formData.append("categoryImage", values.categoryImage);
      }

      if (editingCategories?._id) {
        await toast.promise(updateCategory(editingCategories?._id, formData), {
          loading: categoryLocale?.messages?.updating,
          success: categoryLocale?.messages?.updated,
          error: err => getErrorMessage(err),
        });
      } else {
        await toast.promise(createCategory(formData), {
          loading: categoryLocale?.messages?.creating,
          success: categoryLocale?.messages?.created,
          error: err => getErrorMessage(err),
        });
      }
      await fetchCategory();
      handleCloseModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // If click edit button display data inside input.
  const handleEdit = category => {
    setEditingCategories({
      _id: category?._id,
      name: {
        en: category?.name?.en || "",
        ar: category?.name?.ar || "",
        ku: category?.name?.ku || "",
      },
      categoryImage: undefined,
      isActive: category?.isActive ?? true,
      previewImage: category?.images?.[0]?.url
        ? `${import.meta.env.VITE_API_URL_IMG}${category.images[0].url}`
        : "",
    });
    setOpen(true);
  };

  const handleDelete = async id => {
    const ok = window.confirm("Are you sure you want to delete this category?");
    if (!ok) return;

    try {
      await toast.promise(deleteCategory(id), {
        loading: categoryLocale?.messages?.deleting,
        success: categoryLocale?.messages?.deleted,
        error: err => getErrorMessage(err),
      });

      await fetchCategory();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    }
  };

  // Close modal functionality.
  const handleCloseModal = () => {
    setOpen(false);
    setEditingCategories(null);
  };

  // Open modal functionality.
  const handleOpenCreate = () => {
    setEditingCategories(null);
    setOpen(true);
  };

  return (
    <>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search by name..."
          className="me-4 w-100 bg-white text-black px-4 py-2 rounded-lg outline-0"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <button
          onClick={handleOpenCreate}
          className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg"
        >
          {categoryLocale?.addTitleCategory}
        </button>

        {/* Design Modal */}
        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          title={
            editingCategories
              ? categoryLocale?.editTitleCategory
              : categoryLocale?.addTitleCategory
          }
          size="md"
        >
          {/* Form Fields */}
          <CategoryForm
            initialValues={editingCategories}
            activeLang={activeLang}
            onSubmit={handleSave}
            loading={loading}
            isEdit={!!editingCategories}
            onCancelEdit={handleCloseModal}
          />
        </ModalDesign>
      </div>

      {/* Display Category Product */}
      <div className="my-7">
        <CategoryProduct
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
