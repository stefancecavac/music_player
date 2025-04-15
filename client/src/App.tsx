import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
