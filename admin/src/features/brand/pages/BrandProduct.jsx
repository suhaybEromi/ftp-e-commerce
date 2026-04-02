import DesignCard from "../../../components/card/DesignCard";
import brandLocale from "../locale/brand";

export default function BrandProduct({ brands, onEdit, onDelete }) {
  if (brands === null) return null; // or loading spinner

  return (
    <>
      {brands.length === 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          {brandLocale?.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map(brand => (
            <DesignCard
              key={brand._id}
              name={brand?.name?.en}
              image={`${import.meta.env.VITE_API_URL_IMG}${brand?.images?.[0]?.url}`}
              isActive={
                brand.isActive ? (
                  <span className="text-green-500 px-3 my-1 text-sm">
                    Active
                  </span>
                ) : (
                  <span className="text-red-500 px-3 my-1 text-sm">
                    In Active
                  </span>
                )
              }
              onEdit={() => onEdit(brand)}
              onDelete={() => onDelete(brand._id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
