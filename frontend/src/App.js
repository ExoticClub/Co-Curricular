import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Login from "./Pages/login";
import Homes from "./Pages/Homes";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import Event from "./Pages/Event";
import TopTier from "./Pages/TopTier";
import Circular from "./Pages/Circular";
import Association from "./Pages/Association"
import CircularPreview from "./Pages/CircularPreview";
import Authentication from "./Pages/Authentication";




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="Login" element={<Login />} />
            <Route path="Homes" element={<Homes />} />
            <Route path="Home" element={<Home />} />
            <Route path="Events" element={<Event />} />
            <Route path="Approve" element={<TopTier />} />
            <Route path="Circular" element={<Circular />} />
            <Route path="Association" element={<Association/>}/>
            <Route path="CircularPreview" element={<CircularPreview/>}/>
            <Route path="Authentication" element={<Authentication/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;