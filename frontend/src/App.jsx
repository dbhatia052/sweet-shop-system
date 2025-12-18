import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import SweetsList from "./components/SweetsList";
import AddSweet from "./components/AddSweet";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SweetsList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-sweet"
          element={
            <PrivateRoute adminOnly>
              <AddSweet />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
