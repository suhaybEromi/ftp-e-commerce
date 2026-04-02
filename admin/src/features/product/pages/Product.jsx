import DesignCard from "../../../components/card/DesignCard";
// import collectionLocale from "../locale/collection";

const productss = [
  {
    _id: 1,
    name: "Aris Thorne",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: 2,
    name: "Lyra Belacqua",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: 3,
    name: "Julian Vane",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: 4,
    name: "Julian Vane",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: 5,
    name: "Julian Vane",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: 6,
    name: "Julian Vane",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Product({ products, onEdit, onDelete }) {
  //   if (collections === null) return null;

  return (
    <>
      {productss.length === 0 ? (
        <p className="text-white text-center my-5 font-bold text-4xl">
          {/* {collectionLocale?.empty} */} We
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {productss.map(product => (
            <DesignCard
              key={product._id}
              name={product.name}
              image={product.image}
              //   key={product._id}
              //   name={product.name.en}
              //   image={`${import.meta.env.VITE_API_URL_IMG}${product.images?.[0]?.url}`}
              //   onEdit={() => onEdit(product)}
              //   onDelete={() => onDelete(product._id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
