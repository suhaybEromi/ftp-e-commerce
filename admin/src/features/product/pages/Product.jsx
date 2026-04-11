import DesignCard from "../../../components/card/DesignCard";
import Spinner from "../../../components/form/Spinner";
import productLocale from "../locale/product";

export default function Product({ products = [], onEdit, onDelete }) {
  if (products === null) return <Spinner />;

  return (
    <>
      {products.length === 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          {productLocale?.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {products.map(product => {
            const firstImage = product?.variants?.[0]?.images?.[0]?.url || "";

            return (
              <DesignCard
                key={product._id}
                name={product.name.en}
                image={
                  firstImage
                    ? `${import.meta.env.VITE_API_URL_IMG}${firstImage}`
                    : ""
                }
                itemCode={product.itemCode}
                isActive={product.isActive}
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product._id)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
