import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthPage from "./AuthPage";
import CreateBlog from "./CreateBlog";
import ViewBlog from "./ViewBlog";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/view-blog" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
}

export default App;

// link audio
// https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
// link image
// https://www.w3schools.com/w3css/img_lights.jpg
