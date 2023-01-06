import React from "react";
import Navbar from "./components/Navbar/Navbar";
import AuthContextProvider from "./context/AuthContext";
import GamesContextProvider from "./context/GamesContext";
import MainRoutes from "./rotes/MainRoutes";

const App = () => {
  return (
    <AuthContextProvider>
      <GamesContextProvider>
        <Navbar />
        <MainRoutes />
      </GamesContextProvider>
    </AuthContextProvider>
  );
};

export default App;
