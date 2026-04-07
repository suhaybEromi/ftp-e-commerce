import { useEffect, useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import SubCategoryForm from "../components/SubCategoryForm";
import SubCategoryProduct from "./SubCategoryProduct";
import toast from "react-hot-toast";
import {
  addSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../services/subCategory.service";
import subCategoryLocale from "../locale/subcategoy";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getCategory } from "../../services/category.service";

export default function SubCategoryPage() {
  const [open, setOpen] = useState();
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingSubCategories, setEditingSubCategories] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSubCategories = async () => {
    try {
      const res = await getSubCategory(
        `/?search=${encodeURIComponent(searchQuery)}`,
      );
      setSubCategories(res.subCategory || []);
    } catch (err) {
      toast.error(
        subCategoryLocale?.messages?.fetchError || getErrorMessage(err),
      );
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategory();
      setCategories(res.category || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, [searchQuery]);

  const handleSave = async values => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name[en]", values.name.en);
      formData.append("name[ar]", values.name.ar);
      formData.append("name[ku]", values.name.ku);
      formData.append("category", values.category);
      formData.append("isActive", String(values.isActive));

      if (values.subCategoryImage) {
        formData.append("subCategoryImage", values.subCategoryImage);
      }

      if (editingSubCategories?._id) {
        await toast.promise(
          updateSubCategory(editingSubCategories?._id, formData),
          {
            loading: subCategoryLocale?.messages?.updating,
            success: subCategoryLocale?.messages?.updated,
            error: err => getErrorMessage(err),
          },
        );
      } else {
        await toast.promise(addSubCategory(formData), {
          loading: subCategoryLocale?.messages?.creating,
          success: subCategoryLocale?.messages?.created,
          error: err => getErrorMessage(err),
        });
      }
      await fetchSubCategories();
      handleCloseModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async subCategory => {
    setEditingSubCategories({
      _id: subCategory?._id,
      name: {
        en: subCategory?.name?.en || "",
        ar: subCategory?.name?.ar || "",
        ku: subCategory?.name?.ku || "",
      },
      category: subCategory?.category?._id || subCategory?.category || "",
      subCategoryImage: undefined,
      isActive: subCategory?.isActive ?? true,
      previewImage: subCategory?.images?.[0]?.url
        ? `${import.meta.env.VITE_API_URL_IMG}${subCategory.images[0].url}`
        : "",
    });
    setOpen(true);
  };

  const handleDelete = async id => {
    const ok = window.confirm(
      "Are you sure you want to delete this sub category?",
    );
    if (!ok) return;

    try {
      await toast.promise(deleteSubCategory(id), {
        loading: subCategoryLocale?.messages?.deleting,
        success: subCategoryLocale?.messages?.deleted,
        error: err => getErrorMessage(err),
      });

      await fetchSubCategories();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    }
  };

  //  Close modal functionality
  const handleCloseModal = () => {
    setOpen(false);
    setEditingSubCategories(null);
  };

  // Open modal functionality.
  const handleOpenCreate = () => {
    setEditingSubCategories(null);
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
          {subCategoryLocale?.addTitleSubCategory}
        </button>

        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          onSave={handleSave}
          title={
            editingSubCategories
              ? subCategoryLocale.editTitleSubCategory
              : subCategoryLocale.addTitleSubCategory
          }
          size="md"
        >
          <SubCategoryForm
            initialValues={editingSubCategories}
            categories={categories}
            activeLang={activeLang}
            onSubmit={handleSave}
            loading={loading}
            isEdit={!!editingSubCategories}
            onCancelEdit={handleCloseModal}
          />
        </ModalDesign>
      </div>

      {/* Display Sub Category Product */}
      <div className="my-7">
        <SubCategoryProduct
          subCategories={subCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
