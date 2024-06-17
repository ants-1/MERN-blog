import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Post created successfully", result);
        reset();
        navigate("/");
      } else {
        console.error("Error while creating Post", result);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full rounded-lg border border-gray-400 shadow md:mt-0 sm:max-w-md bg-green-200">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold md:text-2xl">Create Post</h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mb-2">Title is required</p>
              )}
            </div>
            <div>
              <label htmlFor="content" className="block mb-2 font-medium">
                Blog Content:
              </label>
              <textarea
                id="content"
                {...register("content", { required: true })}
                className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
              ></textarea>
              {errors.content && (
                <p className="text-red-500 text-sm mb-2">
                  Blog Content is required
                </p>
              )}
              <label className="block mb-2 font-medium">Published:</label>
              <div>
                <label htmlFor="public">
                  <input
                    type="radio"
                    id="public"
                    name="published"
                    value={true}
                    {...register("published", { required: true })}
                    className="mr-2"
                  />
                  Public
                </label>
                <label htmlFor="private" className="ml-4">
                  <input
                    type="radio"
                    id="private"
                    name="published"
                    value={false}
                    {...register("published", { required: true })}
                    className="mr-2"
                  />
                  Private
                </label>
              </div>
              <input type="hidden" id="author" name="author" />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
