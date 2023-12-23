import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import ComparePage from "./Pages/ComparePage";

function App() {

  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage/>}   />
        <Route path='/user' element={<UserPage/>} />
        <Route path='/compare/:username' element={<ComparePage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
