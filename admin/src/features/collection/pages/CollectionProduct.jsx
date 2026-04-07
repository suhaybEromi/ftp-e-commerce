import DesignCard from "../../../components/card/DesignCard";
import Spinner from "../../../components/form/Spinner";
import collectionLocale from "../locale/collection";

export default function CollectionProduct({ collections, onEdit, onDelete }) {
  if (collections === null) return <Spinner />;

  return (
    <>
      {collections.length === 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          {collectionLocale?.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {collections.map(collection => (
            <DesignCard
              key={collection._id}
              name={collection.name.en}
              image={`${import.meta.env.VITE_API_URL_IMG}${collection.images?.[0]?.url}`}
              isActive={collection.isActive}
              onEdit={() => onEdit(collection)}
              onDelete={() => onDelete(collection._id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
