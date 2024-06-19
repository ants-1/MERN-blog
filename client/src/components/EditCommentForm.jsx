/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

function EditCommentForm({ comment, postId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments/${comment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Comment edited successfully", result);
        reset();
        window.location.reload();
      } else {
        console.error("Error while editing Comment", result);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="bg-white rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mb-2"
        name="text"
        id="text"
        defaultValue={comment.text}
        {...register("text", { required: true })}
      >
      </textarea>
      {errors.comment && (
        <p className="text-red-500 text-sm mb-2">
          Text required to post comment
        </p>
      )}
      <input
        type="submit"
        className="inline-flex bg-white hover:bg-gray-100 w-40 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:cursor-pointer"
        value="Edit Comment"
      />
    </form>
  );
}

export default EditCommentForm;
