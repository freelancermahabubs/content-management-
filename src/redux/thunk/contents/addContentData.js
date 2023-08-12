import {addContent} from "../../actions/contentAction";
import Swal from "sweetalert2";

const addContentData = (contents) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch("http://localhost:5000/api/content", {
        method: "POST",
        body: JSON.stringify(contents),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.acknowledged) {
        dispatch(
          addContent({
            _id: data.insertedId,
            ...contents,
          })
        );

        // Show success alert using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Data Added!",
          text: "The data has been successfully added.",
        });
      } else {
        // Show error alert using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add data.",
        });
      }
    } catch (error) {
      console.error("Error adding data:", error);

      // Show error alert using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding data.",
      });
    }
  };
};

export default addContentData;
