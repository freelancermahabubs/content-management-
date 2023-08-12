import Swal from "sweetalert2";
import {removeContent} from "../../actions/contentAction";

const deleteContent = (id) => {
  return async (dispatch, getState) => {
    // Show the confirmation popup
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this content!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Proceed with deletion if user confirmed
    if (confirmed.isConfirmed) {
      const res = await fetch(`http://localhost:5000/api/content/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.acknowledged) {
        dispatch(removeContent(id));
        Swal.fire("Deleted!", "Content has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete content.", "error");
      }
    }
  };
};

export default deleteContent;
