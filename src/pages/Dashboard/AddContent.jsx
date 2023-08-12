import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useState} from "react";
import addContentData from "../../redux/thunk/contents/addContentData";

const AddContent = () => {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState("");
  const onSubmit = (data) => {
    const content = {
      title: data.title,
      description: data.content,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      image: thumbnail,
    };
    console.log(content);
    dispatch(addContentData(content));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=1bdee39e52ec540d6a99b2ab654cbdf9",
        formData
      );

      setThumbnail(response?.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Content Management App</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 border rounded-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              {...register("title", {required: "Title is required"})}
              className="w-full border rounded p-2"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block font-medium">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              {...register("tags", {required: "tags is required"})}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold">
              Content:
            </label>
            <textarea
              id="content"
              {...register("content", {required: "Content is required"})}
              className="w-full border rounded p-2"
              rows="4"
            />
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-semibold">
              Image:
            </label>
            <input
              type="file"
              {...register("thumbnail", {required: "Thumbnail is required"})}
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Content
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
