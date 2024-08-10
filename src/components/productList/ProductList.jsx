import { initCatalog } from "../../common/store/actions/metadataAction";
import { connect } from "react-redux";
import Product from "../product/Product";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { deleteProduct, viewProduct } from "../../common/apis/productAPI";
import useAuth from "../../common/hooks/useAuth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import useService from "../../common/hooks/useService";

const ProductList = ({ mode, productList, sortBy, category, reFetchAllData }) => {

	const [deleteModal, setDeleteModal] = useState(false);
	const [product, setProduct] = useState(null);
	const { AuthCtx } = useAuth();
	const { accessToken, isAccessTokenValid, logout } = useContext(AuthCtx);
	const [busy, setBusy] = useState(false);
	const { ServicesCtx } = useService();
	const { broadcastMessage } = useContext(ServicesCtx);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	let searchFor = searchParams.get("searchFor");

	if (searchFor === null) {
		searchFor = "";
	}

	let getFilteredProductsBasedOnQuery = (list, str) => {
		if (str !== null && str.length > 0) {
			let filteredList = [];
			for (let i = 0; i < list.length; i++) {
				if (list[i].name.toUpperCase().indexOf(str.toUpperCase()) === 0) {
					filteredList.push(list[i]);
				}
			}
			return filteredList;
		} else {
			return list;
		}
	};

	let getSortedProducts = (list, s) => {
		if (s === undefined || s === null) {
			s = "DEFAULT";
		}
		if (s !== "DEFAULT") {
			list.sort((a, b) => {
				switch (s) {
					case "PRICE_ASC":
						return a.price < b.price ? -1 : (a.price > b.price ? 1 : 0);
					case "PRICE_DESC":
						return a.price < b.price ? 1 : (a.price > b.price ? -1 : 0);
					case "NEWEST":
						let aTime = new Date(a.lastUpdated);
						let bTime = new Date(b.lastUpdated);
						return aTime < bTime ? 1 : (aTime > bTime ? -1 : 0);
					default:
						return a.price < b.price ? 1 : (a.price > b.price ? -1 : 0);
				}
			});
		}
		return list;
	}

	let getFilteredProducts = (list, c) => {
		if (c === undefined || c === null) {
			c = "ALL";
		}
		let filteredList = [];
		for (let i = 0; i < list.length; i++) {
			if (c.toUpperCase() === "ALL" || c.toUpperCase() === list[i].category.toUpperCase()) {
				filteredList.push(list[i]);
			}
		}
		return filteredList;
	}

	let initiateDeleteProduct = (details) => {
		setProduct(details);
		setDeleteModal(true);
	};

	let initiateModifyProduct = (details) => {
		navigate("/product/modify", {
			state: JSON.stringify({
				value: details,
			})
		});
	};

	let initiateViewProduct = (details) => {
		if (isAccessTokenValid()) {
			setBusy(true);
			viewProduct(details.id, accessToken).then((json) => {
				navigate("/product/view", {
					state: JSON.stringify({
						value: json.value,
					})
				});
				setBusy(false);
			}).catch((json) => {
				broadcastMessage(json.reason, "error");
				setBusy(false);
			});
		} else {
			broadcastMessage("Session expired. Please login again!", "info");
			logout().then(() => {
				navigate("/login");
			});
		}
	};

	let handleClose = () => {
		setProduct(null);
		setDeleteModal(false);
	};

	const proceedDelete = () => {
		setBusy(true);
		setDeleteModal(false);
		if (isAccessTokenValid()) {
			deleteProduct(product.id, accessToken).then(() => {
				broadcastMessage("Product " + product.name + " deleted successfully.", "success");
				setBusy(false);
				setProduct(null);
				reFetchAllData(accessToken);
			}).catch((json) => {
				broadcastMessage(json.reason, "error");
				setBusy(false);
				setProduct(null);
			});
		} else {
			broadcastMessage("Session expired. Please login again!", "info");
			logout().then(() => {
				navigate("/login");
			});
		}
	};

	let products = getFilteredProductsBasedOnQuery(getSortedProducts(getFilteredProducts(productList, category), sortBy), searchFor);

	return (
		<>
			<Grid container>
				{products !== null && products.length > 0 &&
					products.map((element, index) => {
						return (
							<Grid key={"parent_product_" + index} item xs={4}>
								<div key={"div_product_" + index} style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
									<Product
										key={"product_" + index}
										mode={mode}
										deleteProduct={initiateDeleteProduct}
										modifyProduct={initiateModifyProduct}
										buyProduct={initiateViewProduct}
										{...element}
									/>
								</div>
							</Grid>
						);
					})
				}
				{
					(products === null || products.length === 0) &&
					<Grid item xs={12}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Typography variant="body1">
								No products available.
							</Typography>
						</div>
					</Grid>
				}
			</Grid>
			{
				deleteModal &&
				<Modal
					open={deleteModal}
					onClose={handleClose}
					aria-labelledby="parent-modal-title"
					aria-describedby="parent-modal-description"
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							bgcolor: 'background.paper',
							borderRadius: 2,
							boxShadow: 24,
							pt: 2,
							px: 4,
							pb: 3
						}}
					>
						<h2 id="parent-modal-title">Confirm deletion of product!</h2>
						<p id="parent-modal-description">
							Are you sure you want to delete the product?
						</p>
						<Button onClick={handleClose} variant={"outlined"} style={{ float: "right", marginLeft: 10 }}>Cancel</Button>
						<Button onClick={proceedDelete} variant={"contained"} style={{ float: "right", marginLeft: 10 }}>Ok</Button>
					</Box>
				</Modal>
			}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={busy}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		productList: state.metadata.products,
		sortBy: state.metadata.selectedSortBy,
		category: state.metadata.selectedCategory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reFetchAllData: (accessToken) => dispatch(initCatalog(accessToken)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);