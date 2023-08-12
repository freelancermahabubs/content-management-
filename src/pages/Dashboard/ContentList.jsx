import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import loadContentData from "../../redux/thunk/contents/fetchContents";
import deleteContent from "../../redux/thunk/contents/deleteContent";
import {useForm} from "react-hook-form";
import {updateContent} from "../../redux/thunk/contents/updateContent";

const ContentList = () => {
  const contents = useSelector((state) => state?.content?.contents);
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    dispatch(loadContentData());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (id) => {
    setModalInfo(contents.find((dt) => dt._id === id));
    setIsOpen(!isOpen);
  };

  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const updatedContents = {
      title: data.title,
      description: data.content,
      tags: data.tags.split(",").map((tag) => tag.trim()),
    };
    // console.log(updatedContents);

    dispatch(updateContent(modalInfo?._id, updatedContents));
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full ">
      <div className="w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <div className="font-semibold text-gray-800">Products</div>
        </header>

        <div className="overflow-x-auto p-3">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th></th>
                <th className="p-2">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Description</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Tags</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Image</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-100">
              {contents.map(({title, description, image, tags, _id}) => (
                <tr key={_id}>
                  <td className="p-2">
                    <input type="checkbox" className="w-5 h-5" value="id-1" />
                  </td>
                  <td className="p-2">
                    <div className="font-medium text-gray-800">{title}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-left capitalize">{description}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-left">
                      <p className="text-red-500 font-medium">{tags} </p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-left font-medium text-indigo-500">
                      <img
                        className="w-14 h-14 rounded-full"
                        src={image}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      <button onClick={() => dispatch(deleteContent(_id))}>
                        <svg
                          className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleModal(_id)}

                        // onClick={() =>
                        //   dispatch(updateContent(_id))}
                      >
                        <svg
                          className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 3l6 6-6 6M10 14H8v-2l5.5-5.5 1.5 1.5L10 14z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute  w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container w-[500px] bg-white  mx-auto rounded shadow-lg z-50">
              <div className="modal-content py-4 text-left px-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Update Content</p>
                  <button
                    onClick={toggleModal}
                    className="modal-close cursor-pointer z-50">
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18">
                      <path d="M18 1.41L16.59 0 9 7.59 1.41 0 0 1.41 7.59 9 0 16.59 1.41 18 9 10.41 16.59 18 18 16.59 10.41 9 18 1.41z"></path>
                    </svg>
                  </button>
                </div>
                {/* Modal Body */}
                <div className="py-2">
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
                        defaultValue={modalInfo?.title}
                        {...register("title", {required: "Title is required"})}
                        className="w-full border rounded p-2"
                      />
                      {errors.title && (
                        <span className="text-red-500">
                          {errors.title.message}
                        </span>
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
                        defaultValue={modalInfo?.tags}
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
                        {...register("content", {
                          required: "Content is required",
                        })}
                        className="w-full border rounded p-2"
                        rows="4"
                        defaultValue={modalInfo?.description}
                      />
                      {errors.content && (
                        <span className="text-red-500">
                          {errors.content.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={toggleModal}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Update Content
                    </button>
                  </form>
                </div>
                {/* Modal Footer */}
                {/* <div className="flex justify-end pt-2">
                  <button className="px-4 py-2 bg-green-700 text-white rounded">
                    Close
                  </button>
          
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // </section>
  );
};

export default ContentList;
