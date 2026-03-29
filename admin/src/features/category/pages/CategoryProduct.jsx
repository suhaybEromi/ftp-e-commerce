import DesignCard from "../../../components/card/DesignCard";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CategoryProduct() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryProduct = async () => {
      try {
        const categories = await api.get("/category");
        setCategories(categories.data.category);
      } catch (err) {
        console.log(err);
      }
    };
    categoryProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {categories.map(category => (
        <DesignCard
          key={category._id}
          name={category.name.en}
          // image={category.image}
          image={"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
        />
      ))}
    </div>
  );
}
