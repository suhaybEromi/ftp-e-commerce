import DesignCard from "../../../components/card/DesignCard";
import Spinner from "../../../components/form/Spinner";
import categoryLocale from "../locale/category";
export default function CategoryProduct({ categories, onEdit, onDelete }) {
  if (categories === null) return <Spinner />;

  return (
    <>
      {categories.length === 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          {categoryLocale?.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(category => (
            <DesignCard
              key={category._id}
              name={category?.name?.en}
              image={`${import.meta.env.VITE_API_URL_IMG}${category.images?.[0]?.url}`}
              isActive={category.isActive}
              onEdit={() => onEdit(category)}
              onDelete={() => onDelete(category._id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
