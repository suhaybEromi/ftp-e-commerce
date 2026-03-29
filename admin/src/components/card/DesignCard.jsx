import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function DesignCard({ name, image, onEdit, onDelete }) {
  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-slate-700 shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-45 bg-slate-800 object-contain"
        />

        <div className="p-2">
          <h3 className="text-md font-semibold text-white truncate">{name}</h3>

          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={onEdit}
              className="rounded-2xl bg-blue-600 px-2 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              <FaRegEdit />
            </button>
            <button
              onClick={onDelete}
              className="rounded-2xl bg-red-600 px-2 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
