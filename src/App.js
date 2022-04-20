import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import ProtectedRoute from "./shared/ProtectedRoute";
import AdminRoute from "./shared/AdminRoute";
import HomeScreen from "./screens/HomeScreen";
import Temp from "./screens/Temp";
import ProtectedTemp from "./screens/ProtectedTemp";
import AdminTemp from "./screens/AdminTemp";
import ErrorScreen from "./screens/ErrorScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="/temp" element={<Temp />} />
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
    </BrowserRouter>
  );
};

export default App;
