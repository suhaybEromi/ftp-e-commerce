import { useEffect, useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import CollectionForm from "../components/CollectionForm";
import CollectionProduct from "./CollectionProduct";
import collectionLocale from "../locale/collection";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  addCollection,
  deleteCollection,
  getCollection,
  updateCollection,
} from "../../services/collection.service";
import { getSubCategory } from "../../services/subCategory.service";
import subCategoryLocale from "../../subcategory/locale/subcategoy";
import toast from "react-hot-toast";

export default function CollectionPage() {
  const [open, setOpen] = useState();
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [editingCollection, setEditingCollection] = useState(null);

  const fetchCollection = async () => {
    try {
      const res = await getCollection();
      setCollections(res.collections || []);
    } catch (err) {
      toast.error(
        collectionLocale?.messages?.fetchError || getErrorMessage(err),
      );
      console.error(err);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const res = await getSubCategory();
      setSubCategories(res.subCategory || []);
    } catch (err) {
      toast.error(
        subCategoryLocale?.messages?.fetchError || getErrorMessage(err),
      );
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCollection();
    fetchSubCategory();
  }, []);

  const handleSave = async values => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name[en]", values.name.en);
      formData.append("name[ar]", values.name.ar);
      formData.append("name[ku]", values.name.ku);
      formData.append("subCategory", values.subCategory);
      formData.append("isActive", String(values.isActive));

      if (values.collectionImage) {
        formData.append("collectionImage", values.collectionImage);
      }

      if (editingCollection?._id) {
        await toast.promise(
          updateCollection(editingCollection?._id, formData),
          {
            loading: collectionLocale?.messages?.updating,
            success: collectionLocale?.messages?.updated,
            error: err => getErrorMessage(err),
          },
        );
      } else {
        await toast.promise(addCollection(formData), {
          loading: collectionLocale?.messages?.creating,
          success: collectionLocale?.messages?.created,
          error: err => getErrorMessage(err),
        });
      }
      await fetchCollection();
      handleCloseModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async collection => {
    setEditingCollection({
      _id: collection?._id,
      name: {
        en: collection?.name?.en || "",
        ar: collection?.name?.ar || "",
        ku: collection?.name?.ku || "",
      },
      subCategory:
        collection?.subCategory?._id || collection?.subCategory || "",
      collectionImage: undefined,
      isActive: collection?.isActive ?? true,
      previewImage: collection?.images?.[0]?.url
        ? `${import.meta.env.VITE_API_URL_IMG}${collection.images[0].url}`
        : "",
    });
    setOpen(true);
  };

  const handleDelete = async id => {
    const ok = window.confirm(
      "Are you sure you want to delete this collection?",
    );
    if (!ok) return;

    try {
      await toast.promise(deleteCollection(id), {
        loading: collectionLocale?.messages?.deleting,
        success: collectionLocale?.messages?.deleted,
        error: err => getErrorMessage(err),
      });

      await fetchCollection();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    }
  };

  // Close modal functionality
  const handleCloseModal = () => {
    setOpen(false);
    setEditingCollection(null);
  };

  // Open modal functionality.
  const handleCreateModal = () => {
    setEditingCollection(null);
    setOpen(true);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={handleCreateModal}
          className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg"
        >
          {collectionLocale?.addTitleCollection}
        </button>

        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          onSave={handleSave}
          title={
            editingCollection
              ? collectionLocale?.editTitleCollection
              : collectionLocale?.addTitleCollection
          }
          size="md"
        >
          <CollectionForm
            initialValues={editingCollection}
            subCategories={subCategories}
            activeLang={activeLang}
            onSubmit={handleSave}
            loading={loading}
            isEdit={!!editingCollection}
            onCancelEdit={handleCloseModal}
          />
        </ModalDesign>
      </div>

      {/* Display Collection Product */}
      <div className="my-7">
        <CollectionProduct
          collections={collections}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
