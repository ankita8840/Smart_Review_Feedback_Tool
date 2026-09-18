import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ReviewPage from "./pages/ReviewPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      {/* Navigation */}
      <nav className="navbar">

        <h2 style={{ textAlign: "center", fontSize: "31px" }}>Smart Review Tool</h2>

        <div className="nav-links" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

          <Link to="/">
            Review Page
          </Link>

          <Link to="/dashboard">
            Admin Dashboard
          </Link>

        </div>

      </nav>


      {/* Pages */}
      <Routes>

        <Route path="/" element={<ReviewPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;