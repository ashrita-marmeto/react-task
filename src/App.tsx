import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import Home from "./pages/Home";
import HashtagPage from "./pages/HashtagPage";

const App = () => {
  return (
    <PostProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tag/:tag" element={<HashtagPage />} />
          <Route path="/tag/:tag/page/:page" element={<HashtagPage />} />
          <Route path="/page/:page" element={<Home />} />
        </Routes>
      </Router>
    </PostProvider>
  );
};

export default App;

