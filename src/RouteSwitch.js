import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Subreddit from "./components/Subreddit";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/subreddit" element={<Subreddit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
