import { useEffect, useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import ProductForm from "../components/ProductForm";
import Product from "./Product";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/product.service";
import productLocale from "../locale/product";
import { getErrorMessage } from "../../utils/getErrorMessage";
import toast from "react-hot-toast";
import { getCollection } from "../../services/collection.service";
import { getBrands } from "../../services/brand.service";

export default function AddProductPage() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [collections, setCollections] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await getProducts(
        `/?search=${encodeURIComponent(searchQuery)}`,
      );
      setProducts(res.products || []);
    } catch (err) {
      toast.error(productLocale?.messages?.fetchError || getErrorMessage(err));
      console.error(getErrorMessage(err));
    }
  };

  const fetchCollection = async () => {
    try {
      const res = await getCollection();
      setCollections(res.collections || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.brands || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  // Fetch Collections & Brands
  useEffect(() => {
    fetchCollection();
    fetchBrands();
  }, []);

  const handleSave = async values => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "name",
        JSON.stringify(values.name || { en: "", ar: "", ku: "" }),
      );

      formData.append(
        "description",
        JSON.stringify(values.description || { en: "", ar: "", ku: "" }),
      );

      formData.append("itemCode", values.itemCode || "");
      formData.append("size", values.size || "");
      formData.append("keyword", JSON.stringify(values.keyword || []));
      formData.append("collectionName", values.collectionName || "");
      formData.append("brand", values.brand || "");
      formData.append("price", String(values.price ?? ""));
      formData.append("discountPrice", String(values.discountPrice ?? ""));
      formData.append("isFeatured", String(values.isFeatured ?? false));
      formData.append("rating", String(values.rating ?? 0));
      formData.append("points", String(values.points ?? 0));
      formData.append("cashback", String(values.cashback ?? 0));
      formData.append("isActive", String(values.isActive ?? true));

      const hasWarranty =
        (values.warranty?.duration !== undefined &&
          values.warranty?.duration !== "") ||
        !!values.warranty?.unit ||
        !!values.warranty?.description;

      if (hasWarranty) {
        formData.append(
          "warranty",
          JSON.stringify({
            duration:
              values.warranty?.duration !== undefined &&
              values.warranty?.duration !== ""
                ? Number(values.warranty.duration)
                : undefined,
            unit: values.warranty?.unit || undefined,
            description: values.warranty?.description || undefined,
          }),
        );
      }

      const variantsPayload = (values.variants || []).map(variant => ({
        _id: variant._id || undefined,
        color: variant.color || { en: "" },
        stockStatus: variant.stockStatus || "in_stock",
        stockQuantity:
          variant.stockStatus === "out_of_stock"
            ? 0
            : Number(variant.stockQuantity || 0),
      }));

      formData.append("variants", JSON.stringify(variantsPayload));

      (values.variants || []).forEach((variant, index) => {
        const files = Array.isArray(variant.images) ? variant.images : [];

        files.forEach(file => {
          formData.append(`variant_${index}_images`, file);
        });
      });

      if (editingProduct?._id) {
        await toast.promise(updateProduct(editingProduct._id, formData), {
          loading: productLocale?.messages?.updating,
          success: productLocale?.messages?.updated,
          error: err => getErrorMessage(err),
        });
      } else {
        await toast.promise(createProduct(formData), {
          loading: productLocale?.messages?.creating,
          success: productLocale?.messages?.created,
          error: err => getErrorMessage(err),
        });
      }

      await fetchProducts();
      handleCloseModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async product => {
    setEditingProduct({
      _id: product?._id || "",
      name: {
        en: product?.name?.en || "",
        ar: product?.name?.ar || "",
        ku: product?.name?.ku || "",
      },
      description: {
        en: product?.description?.en || "",
        ar: product?.description?.ar || "",
        ku: product?.description?.ku || "",
      },
      itemCode: product?.itemCode || "",
      collectionName:
        product?.collectionName?._id || product?.collectionName || "",
      brand: product?.brand?._id || product?.brand || "",
      size: product?.size || "",
      price: product?.price ?? "",
      discountPrice: product?.discountPrice ?? 0,
      keyword: product?.keyword || [],
      warranty: {
        duration: product?.warranty?.duration ?? 1,
        unit: product?.warranty?.unit || "days",
        description: product?.warranty?.description || "",
      },
      isFeatured: product?.isFeatured ?? false,
      rating: product?.rating ?? 0,
      points: product?.points ?? 0,
      cashback: product?.cashback ?? 0,
      isActive: product?.isActive ?? true,
      variants:
        product?.variants?.length > 0
          ? product.variants.map(variant => ({
              _id: variant?._id || "",
              color: { en: variant?.color?.en || "" },
              stockStatus: variant?.stockStatus || "in_stock",
              stockQuantity:
                variant?.stockStatus === "out_of_stock"
                  ? 0
                  : (variant?.stockQuantity ?? ""),
              images: [],
              existingImages: variant?.images || [],
            }))
          : [
              {
                color: { en: "" },
                stockStatus: "in_stock",
                stockQuantity: "",
                images: [],
                existingImages: [],
              },
            ],
    });

    setOpen(true);
  };

  const handleDelete = async id => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await toast.promise(deleteProduct(id), {
        loading: productLocale?.messages?.deleting,
        success: productLocale?.messages?.deleted,
        error: err => getErrorMessage(err),
      });

      await fetchProducts();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error(err);
    }
  };

  // Close modal functionality
  const handleCloseModal = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  // Open modal functionality.
  const handleCreateModal = () => {
    setEditingProduct(null);
    setOpen(true);
  };

  return (
    <>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="me-2 w-100 bg-gray-100 text-black px-4 py-2 rounded-lg outline-0"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <button className="cursor-pointer mx-3 bg-green-700 text-white px-4 py-2 rounded-lg">
          Import Excel
        </button>

        <button
          onClick={handleCreateModal}
          className="cursor-pointer bg-gray-100 text-black px-4 py-2 rounded-lg"
        >
          {productLocale?.addTitleProduct}
        </button>

        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          onSave={handleSave}
          title={
            editingProduct
              ? productLocale.editTitleProduct
              : productLocale.addTitleProduct
          }
          size="xxl"
        >
          <ProductForm
            initialValues={editingProduct}
            collections={collections}
            brands={brands}
            activeLang={activeLang}
            onSubmit={handleSave}
            loading={loading}
            isEdit={!!editingProduct}
            onCancelEdit={handleCloseModal}
          />
        </ModalDesign>
      </div>

      {/* Display Product */}
      <div className="my-7">
        <Product
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
