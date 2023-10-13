import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import AdminPage from "./pages/admin/AdminPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import UnauthorizedPage from "./pages/unauthorized/UnauthorizedPage";
import { AuthGuard } from "./guards/AuthGuard";
import { Role } from "./models/Role";
import ProductSave from "./components/ProductSave";
import ProductEdit from "./components/ProductEdit";
function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/profile"
            element={
              <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                <ProfilePage />
              </AuthGuard>
            }
          />

          <Route
            path="/admin"
            element={
              <AuthGuard roles={[Role.ADMIN]}>
                <AdminPage />
              </AuthGuard>
            }
          />
          <Route
            path="/save"
            element={
              <AuthGuard roles={[Role.ADMIN]}>
                <ProductSave />
              </AuthGuard>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AuthGuard roles={[Role.ADMIN]}>
                <ProductEdit />
              </AuthGuard>
            }
          />

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
