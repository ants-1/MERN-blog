import { useForm } from "react-hook-form";
import { jwtDecode } from 'jwt-decode'; 

// eslint-disable-next-line react/prop-types
function CommentForm({ postId }) {
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

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user._id;

      data.author = userId;

      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Comment created successfully", result);
        reset();
        window.location.reload();
      } else {
        console.error("Error while creating Comment", result);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  
  return (
    <div className="flex mx-auto items-center justify-center border border-gray-400 rounded-lg mb-4 shadow-md">
      <form
        className="w-full max-w-xl bg-green-200 rounded-lg px-4 pt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-lg font-semibold">
            Add a new comment
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-white rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="text"
              id="text"
              placeholder="Type Your Comment..."
              {...register("text", { required: true })}
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm mb-2">
                Text required to post comment
              </p>
            )}
          </div>
          <div className="w-full md:w-full flex items-start px-3">
            <div className="-mr-1">
              <input
                type="submit"
                className="inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:cursor-pointer"
                value="Post Comment"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
