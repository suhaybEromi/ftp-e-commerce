import { useForm } from "react-hook-form";

export default function Az() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", age: "" },
  });

  const onSubmit = async data => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 text-black">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", { required: "Please required name field" })}
          className="border border-gray-600 p-2"
          placeholder="Enter Name"
        />
        {errors.name && (
          <p className="text-red-500 text-lg">{errors.name.message}</p>
        )}

        <br />
        <input
          type="number"
          {...register("age", { required: "Please required age field" })}
          className="border border-gray-600 p-2 my-2"
          placeholder="Enter Age"
        />
        {errors.age && (
          <p className="text-red-500 text-lg">{errors.age.message}</p>
        )}

        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
