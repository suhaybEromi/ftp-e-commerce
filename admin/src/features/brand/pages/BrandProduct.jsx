import DesignCard from "../../../components/card/DesignCard";

export default function BrandProduct({ brands, onEdit, onDelete }) {
  return (
    <>
      {brands.length <= 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          داتای براند بەتاڵە حەیاتم
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <>
            {brands.map(brand => {
              return (
                <DesignCard
                  key={brand._id}
                  name={brand?.name?.en}
                  image={`${import.meta.env.VITE_API_URL_IMG}${brand?.images?.[0]?.url}`}
                  onEdit={() => onEdit(brand)}
                  onDelete={() => onDelete(brand._id)}
                />
              );
            })}
          </>
        </div>
      )}
    </>
  );
}
