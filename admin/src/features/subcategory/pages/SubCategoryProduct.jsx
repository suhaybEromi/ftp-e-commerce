import DesignCard from "../../../components/card/DesignCard";
import subCategoryLocale from "../locale/subcategoy";

export default function SubCategoryProduct({
  subCategories,
  onEdit,
  onDelete,
}) {
  if (subCategories === null) return null;

  return (
    <>
      {subCategories.length === 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          {subCategoryLocale?.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {subCategories.map(subcategory => (
            <DesignCard
              key={subcategory._id}
              name={subcategory?.name?.en}
              image={`${import.meta.env.VITE_API_URL_IMG}${subcategory.images?.[0]?.url}`}
              isActive={
                subcategory.isActive ? (
                  <span className="text-green-500 px-3 my-1 text-sm">
                    Active
                  </span>
                ) : (
                  <span className="text-red-500 px-3 my-1 text-sm">
                    In Active
                  </span>
                )
              }
              onEdit={() => onEdit(subcategory)}
              onDelete={() => onDelete(subcategory._id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
