import { useState } from "react";
import ModalDesign from "../../../components/modal/ModalDesign";
import CollectionForm from "../components/CollectionForm";
import DesignCard from "../../../components/card/DesignCard";
import CollectionProduct from "./CollectionProduct";

export default function CollectionPage() {
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
          Add Collection
        </button>

        <ModalDesign
          open={open}
          onClose={() => setOpen(false)}
          onSave={handleSave}
          title="Add Collection"
          size="md"
        >
          <CollectionForm
            activeLang={activeLang}
            setActiveLang={setActiveLang}
          />
        </ModalDesign>
      </div>

      {/* Display Collection Product */}
      <div className="my-7">
        <CollectionProduct />
      </div>
    </>
  );
}
