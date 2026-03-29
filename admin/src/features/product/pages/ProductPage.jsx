import { useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import ProductForm from "../components/ProductForm";

export default function ProductPage() {
  const [open, setOpen] = useState();

  const [activeLang, setActiveLang] = useState("en");

  const handleSave = async () => {};

  return (
    <div className="flex justify-end">
      <button className="cursor-pointer mx-4 bg-green-700 text-white px-4 py-2 rounded-lg">
        Import Excel
      </button>

      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-gray-100 text-black px-4 py-2 rounded-lg"
      >
        Add Product
      </button>

      <ModalDesign
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        title="Add Product"
        size="xl"
      >
        <ProductForm activeLang={activeLang} setActiveLang={setActiveLang} />
      </ModalDesign>
    </div>
  );
}
