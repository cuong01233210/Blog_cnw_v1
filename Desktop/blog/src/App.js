import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthPage from "./AuthPage";
import CreateBlog from "./CreateBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
