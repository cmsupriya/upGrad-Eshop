import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import './index.css';
import store from "./common/store";
import useAuth from "./common/hooks/useAuth";
import useService from "./common/hooks/useService";
import Navbar from "./components/navbar/Navbar";
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import ShowMessage from './components/showMessage/ShowMessage';

const ConnectedApp = () => {
  const { AuthProvider } = useAuth();
  const { ServicesProvider } = useService();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      disabled: {
        main: "#56595c",
      }
    },
  });

  return (
    <AuthProvider>
      <ServicesProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router>
              <Navbar/>
              <Container maxWidth={false} sx={{ marginBottom: "30px", marginTop: "85px" }}>
                <Grid container spacing={2} sx={{ paddingTop: "24px" }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={ <SignUp />} />
                  </Routes>
                </Grid>
              </Container>
              <Footer />
              <ShowMessage />
            </Router>
          </ThemeProvider>
        </Provider>
      </ServicesProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConnectedApp />
);