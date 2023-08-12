import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Card from "../../components/Card";

import loadContentData from "../../redux/thunk/contents/fetchContents";
import SortingTime from "../../components/SortingTime";

const Home = () => {
  const contents = useSelector((state) => state?.content.contents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadContentData());
  }, [dispatch]);

  let content;

  if (contents?.length) {
    content = contents.map((content) => (
      <Card key={content._id} content={content} />
    ));
  }

  return (
    <div>
      <div>
        <SortingTime />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
