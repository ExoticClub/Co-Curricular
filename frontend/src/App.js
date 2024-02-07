import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Login from "./Pages/login";
import Homes from "./Pages/Homes";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="Login" element={<Login />} />
            <Route path="Homes" element={<Homes />} />
            <Route path="Home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;