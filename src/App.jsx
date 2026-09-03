import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ApplicationDetails from "./pages/user/ApplicationDetails";
import ApplicationForm from "./pages/user/ApplicationForm";
import PassportDetails from "./pages/user/PassportDetails";
import AddressDetails from "./pages/user/AddressDetails";


import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />}/>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetails />
            </ProtectedRoute>
          }
        />

          <Route
            path="/applications/:id/personal"
            element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id/passport"
            element={
              <ProtectedRoute>
                <PassportDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id/address"
            element={
              <ProtectedRoute>
                <AddressDetails />
              </ProtectedRoute>
            }
          />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;