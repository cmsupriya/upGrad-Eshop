import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useDispatch } from "react-redux";
import { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Grid from '@mui/material/Grid';
import './App.css';
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import Footer from "../footer/Footer";
import ProtectedRoute from "../authRoute/AuthRoute";
import Navbar from '../navbar/Navbar';
import { initCatalog } from "../../common/store/actions/metadataAction";
import useAuth from '../../common/hooks/useAuth';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useService from "../../common/hooks/useService";

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

const App = () => {
	const { AuthCtx } = useAuth();
	const { ServicesCtx } = useService();
	const { accessToken } = useContext(AuthCtx);
	const { message, level, showMessage } = useContext(ServicesCtx);
	const [ showInfo, setShowInfo ] = useState(false);
	const dispatch = useDispatch();

	const initPageData = useCallback(() => {
		dispatch(initCatalog(accessToken));
	}, [dispatch, accessToken]);

	useEffect(() => {
		initPageData();
		if(message === null || level === null) {
			setShowInfo(false);
		} else {
			setShowInfo(true);
		}
	}, [initPageData, message, level]);

	let hideAndResetMessage = () => {
		setShowInfo(false);
		showMessage(null, null);
	};

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navbar />
				<Container maxWidth={false} sx={{ marginBottom: "30px", marginTop: "85px" }}>
					<Grid container spacing={2} sx={{ paddingTop: "24px" }}>
						<Routes>
							<Route
								path="/"
								element={
									<Navigate to="/home" />
								}
							/>
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/login"
								element={
									<Login />
								}
							/>
							<Route
								path="/signup"
								element={
									<SignUp />
								}
							/>
						</Routes>
					</Grid>
				</Container>
				<Footer />
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={showInfo}
					autoHideDuration={4000}
					onClose={() => hideAndResetMessage()}
				>
					<Alert onClose={() => hideAndResetMessage()} severity={level} sx={{ width: '100%' }}>
						{message}
					</Alert>
				</Snackbar>
			</Router>
		</ThemeProvider>
	);
};

export default App;
