import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";

export default function App() {
  return (
    <div className="bg-gray-200 h-dvh overflow-auto w-full" data-theme="light">
      <BrowserRouter>
        <header className="bg-gray-950 w-full py-4 flex justify-center mb-4">
          <div className="container flex justify-between items-center text-white ">
            <h1>Logo</h1>
            <nav className="flex gap-4">
              <Link to="/">InstaPay</Link>
              <Link to="/inverntory">Inventory</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/login" element={<h1>Login Page</h1>} />
        </Routes>

        <footer>Footer</footer>
      </BrowserRouter>
    </div>
  );
}