import { useEffect, useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import ProductForm from "../components/ProductForm";
import Product from "./Product";

export default function ProductPage() {
  const [open, setOpen] = useState();
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [collections, setCollections] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = () => {
    try {
    } catch (err) {}
  };

  const fetchCollection = () => {
    try {
    } catch (err) {}
  };

  useEffect(() => {
    fetchProducts();
    fetchCollection();
  }, [searchQuery]);

  const handleSave = async values => {
    try {
    } catch (err) {}
  };

  const handleEdit = async product => {};

  const handleDelete = async id => {
    try {
    } catch (err) {}
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
          Add Product
        </button>

        <ModalDesign
          open={open}
          onClose={handleCloseModal}
          onSave={handleSave}
          title="Add Product"
          size="xxl"
        >
          <ProductForm activeLang={activeLang} setActiveLang={setActiveLang} />
        </ModalDesign>
      </div>

      {/* Display Collection Product */}
      <div className="my-7">
        <Product />
      </div>
    </>
  );
}
