import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Home/Home";
import New from "../pages/New";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Main />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="new"
            element={<New />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}