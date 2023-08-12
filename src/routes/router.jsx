import {createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Main/Home";
import Dashboard from "../layout/Dashboard/Dashboard";
import AddContent from "../pages/Dashboard/AddContent";
import ContentList from "../pages/Dashboard/ContentList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <ContentList />,
      },
      {
        path: "add-content",
        element: <AddContent />,
      },
    ],
  },
]);

export default router;
