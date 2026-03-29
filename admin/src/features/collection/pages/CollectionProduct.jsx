import { useEffect, useState } from "react";
import DesignCard from "../../../components/card/DesignCard";
import api from "../../services/api";

export default function CollectionProduct() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const collectionProduct = async () => {
      try {
        const collection = await api.get("/collection");
        setCollections(collection.data.collections);
      } catch (err) {
        console.log(err);
      }
    };
    collectionProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {collections.map(collection => (
        <DesignCard
          key={collection._id}
          name={collection.name.en}
          // image={collection.image}
          image={"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
        />
      ))}
    </div>
  );
}
