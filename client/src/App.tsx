import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./layout";
import { LandingPage } from "./pages/LandingPage";
import { UseAuthContext } from "./context/AuthContext";
import MagicLoginPage from "./pages/MagicLoginPage";

function App() {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            user ? (
              <Layout>
                <MainPage />
              </Layout>
            ) : (
              <Navigate to={"/welcome"} />
            )
          }
        />

        <Route
          path="/welcome"
          element={
            user ? (
              <Navigate to={"/"} />
            ) : (
              <Layout>
                <LandingPage />
              </Layout>
            )
          }
        />

        <Route path="/magic-login" element={!user ? <MagicLoginPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
