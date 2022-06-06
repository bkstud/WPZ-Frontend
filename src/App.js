import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./shared/ProtectedRoute";
import AdminRoute from "./shared/AdminRoute";
import HomeScreen from "./screens/HomeScreen";
import Logout from "./screens/Logout";
import ProtectedTemp from "./screens/ProtectedTemp";
import AdminTemp from "./screens/AdminTemp";
import ErrorScreen from "./screens/ErrorScreen";
import Tests from "./screens/Tests";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FaqScreen from "./screens/FaqScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import ExamResults from "./screens/ExamResults";
import ExamApproach from "./screens/ExamApproach";
import ExamApproachFinished from "./screens/ExamApproachFinished";

const App = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/about" element={<FaqScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/tests/approaches" element={<ExamApproach />} />
            <Route path="/tests/:examId/approaches/finished" element={<ExamApproachFinished  />} />
            <Route path="/tests/approaches/results" element={<ExamResults />} />
            <Route path="/tests/approaches/:approachId/results" element={<ExamResults />} />
            <Route
              path="/protectedTemp"
              element={
                <ProtectedRoute>
                  <ProtectedTemp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminTemp"
              element={
                <AdminRoute>
                  <AdminTemp />
                </AdminRoute>
              }
            />
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
