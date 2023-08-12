import axios from "axios";
import Swal from "sweetalert2";
import {updateContentMy} from "../../actions/contentAction";

export const updateContent =
  (id, updatedContents) => async (dispatch, getState) => {
    console.log(updatedContents);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/content/${id}`,
        updatedContents
      );

      console.log(response);

      if (response?.data.data) {
        dispatch(updateContentMy(id));
        Swal.fire("Update!", "Content has been updated.", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };
