import { useEffect, useState } from "react";
import api from "../../services/api";
import DesignCard from "../../../components/card/DesignCard";

export default function SubCategoryProduct() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const subCategoryProduct = async () => {
      try {
        const subCategories = await api.get("/subcategory");
        setSubCategories(subCategories.data.subCategory);
        console.log(subCategories.data.subCategory);
      } catch (err) {
        console.log(err);
      }
    };
    subCategoryProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {subCategories.map(subcategory => (
        <DesignCard
          key={subcategory._id}
          name={subcategory.name.en}
          // image={subcategory.image}
          image={"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
        />
      ))}
    </div>
  );
}
