import React from "react";
import {
  sortByFirstUpload,
  sortByLastUpload,
} from "../redux/actions/contentAction";
import {useDispatch, useSelector} from "react-redux";

const SortingTime = () => {
  const contents = useSelector((state) => state?.content.contents);
  const dispatch = useDispatch();
  const handleSortByLastUpload = () => {
    dispatch(sortByLastUpload(contents.map((content) => content.timestamp)));
  };

  const handleSortByFirstUpload = () => {
    useDispatch(
      sortByFirstUpload(contents.map((content) => content.timestamp))
    );
  };

  return (
    <div>
      <div className=" my-2 text-white ">
        <button
          className="bg-red-600 p-2 mr-2"
          onClick={handleSortByLastUpload}>
          Sort by Last Upload
        </button>
        <button className="bg-green-600 p-2" onClick={handleSortByFirstUpload}>
          Sort by First Upload
        </button>
      </div>
    </div>
  );
};

export default SortingTime;
