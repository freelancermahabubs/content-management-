import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
