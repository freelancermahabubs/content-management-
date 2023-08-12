import {BiListPlus} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";

import {addReadingHistory} from "../redux/actions/contentAction";
// import {addToCart, removeFromCart} from "../redux/actions/productAction";

const Card = ({content}) => {
  const dispatch = useDispatch();
  const readingHistory = useSelector((state) => state?.content.readingHistory); // Assuming you have 'readingHistory' in your Redux store

  const handleMarkAsRead = () => {
    dispatch(addReadingHistory(content._id));
  };

  return (
    <div className="shadow-lg relative rounded-3xl border p-3 flex flex-col text-indigo-900">
      <div className="h-52 w-52 mx-auto">
        <img src={content.image} alt="contentImage" />
      </div>
      <h1 className="font-bold ">{content.tags}</h1>
      <p className="text-center mt-2  font-semibold mb-3">
        Title:
        {content?.title}
      </p>
      <div className=" flex-1">
        <h2>Description: {content?.description}</h2>
      </div>
      <div className="flex gap-2 mt-5">
        <button onClick={handleMarkAsRead}>
          {readingHistory.includes(content._id)
            ? "Already Read"
            : "Mark as Read"}
        </button>
        <button
          title="Add to wishlist"
          className="bg-indigo-500  py-1 px-2 rounded-full">
          <BiListPlus className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Card;
