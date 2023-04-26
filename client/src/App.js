import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";

import "./App.css";
import Email from "./Pages/Email";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Email />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
