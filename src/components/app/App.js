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
import AuthRoute from "../authRoute/AuthRoute";
import Navbar from '../navbar/Navbar';
import { initCatalog } from "../../common/store/actions/metadataAction";
import useAuth from '../../common/hooks/useAuth';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useService from "../../common/hooks/useService";
import ProductModify from '../productModify/ProductModify';
import { createProduct, modifyProduct } from "../../common/apis/productAPI";
import ProductView from '../productView/ProductView';
import PlaceOrder from '../placeOrder/PlaceOrder';

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
	const [showInfo, setShowInfo] = useState(false);
	const dispatch = useDispatch();

	const initPageData = useCallback(() => {
		dispatch(initCatalog(accessToken));
	}, [dispatch, accessToken]);

	useEffect(() => {
		initPageData();
		if (message === null || level === null) {
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
									<AuthRoute>
										<Home />
									</AuthRoute>
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
							<Route
								path="/product/add"
								element={
									<AuthRoute role={["ADMIN"]}>
										<ProductModify
											mode={"CREATE"}
											buttonText="SAVE PRODUCT"
											headingText="Add Product"
											callbackFunction={createProduct}
										/>
									</AuthRoute>
								}
							/>
							<Route
								path="/product/modify"
								element={
									<AuthRoute role={["ADMIN"]}>
										<ProductModify
											mode={"MODIFY"}
											buttonText="MODIFY PRODUCT"
											headingText="Modify Product"
											callbackFunction={modifyProduct}
										/>
									</AuthRoute>
								}
							/>
							<Route
								path="/product/view"
								element={
									<AuthRoute >
										<ProductView />
									</AuthRoute>
								}
							/>
							<Route
								path="/product/order"
								element={
									<AuthRoute>
										<PlaceOrder />
									</AuthRoute>
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
