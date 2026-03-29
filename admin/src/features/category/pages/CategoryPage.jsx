import { useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import CategoryForm from "../components/CategoryForm";
import CategoryProduct from "./CategoryProduct";

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  const handleSave = async () => {};

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-lg"
        >
          Add Category
        </button>

        {/* Design Modal */}
        <ModalDesign
          open={open}
          onClose={() => setOpen(false)}
          onSave={handleSave}
          title="Add Category"
          size="md"
        >
          {/* Form Fields */}
          <CategoryForm activeLang={activeLang} setActiveLang={setActiveLang} />
        </ModalDesign>
      </div>

      {/* Display Category Product */}
      <div className="my-7">
        <CategoryProduct />
      </div>
    </>
  );
}
