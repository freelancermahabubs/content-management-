import {setContents} from "../../actions/contentAction";

const loadContentData = () => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch("http://localhost:5000/api/content");
      if (!res.ok) {
        throw new Error("Failed to fetch Content data.");
      }

      const data = await res.json();

      if (data?.length) {
        dispatch(setContents(data));
      }
    } catch (error) {
      console.error("Error while fetching Content data:", error);
    }
  };
};

export default loadContentData;
