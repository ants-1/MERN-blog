import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function EditPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        const result = await response.json();
        if (response.ok) {
          setPost(result);
          reset(result);
        } else {
          console.error("Error fetching post", result);
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchPost();
  }, [id, reset]);

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

      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Post updated successfully", result);
        reset();
        navigate("/");
      } else {
        console.error("Error while updating Post", result);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  if (!post) {
    const type = "spin";
    const color = "#000000";
    return (
      <div className="flex items-center justify-center h-96">
        <ReactLoading
          type={type}
          color={color}
          height={"60px"}
          width={"60px"}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full rounded-lg border border-gray-400 shadow md:mt-0 sm:max-w-md bg-green-200">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold md:text-2xl">Edit Post</h1>
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
                defaultValue={post.title}
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
                defaultValue={post.content}
                className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
              ></textarea>
              {errors.content && (
                <p className="text-red-500 text-sm mb-2">
                  Blog Content is required
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium">Published:</label>
              <div>
                <label htmlFor="public">
                  <input
                    type="radio"
                    id="public"
                    name="published"
                    value="true"
                    defaultChecked={post.published === true}
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
                    value="false"
                    defaultChecked={post.published === false}
                    {...register("published", { required: true })}
                    className="mr-2"
                  />
                  Private
                </label>
              </div>
              {errors.published && (
                <p className="text-red-500 text-sm mb-2">
                  Published status is required
                </p>
              )}
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

export default EditPostForm;
