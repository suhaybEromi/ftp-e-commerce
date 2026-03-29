import { useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import SubCategoryForm from "../components/SubCategoryForm";
import SubCategoryProduct from "./SubCategoryProduct";

export default function SubCategoryPage() {
  const [open, setOpen] = useState();

  const [activeLang, setActiveLang] = useState("en");

  const handleSave = async () => {};

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-lg"
        >
          Add Sub Category
        </button>

        <ModalDesign
          open={open}
          onClose={() => setOpen(false)}
          onSave={handleSave}
          title="Add Sub Category"
          size="md"
        >
          <SubCategoryForm
            activeLang={activeLang}
            setActiveLang={setActiveLang}
          />
        </ModalDesign>
      </div>

      {/* Display Sub Category Product */}
      <div className="my-7">
        <SubCategoryProduct />
      </div>
    </>
  );
}
