import { fetchAllProducts } from "../../apis/productAPI";
import { fetchAllCategories } from "../../apis/categoryAPI";

export const setFilter = (category) => {
	return {
		type: "SET_FILTER",
		category: category,
	}
};

export const clearFilter = () => {
	return {
		type: "CLEAR_FILTER",
	}
};

export const initCatalog = (accessToken) => dispatch => {
	Promise.all([fetchAllCategories(accessToken), fetchAllProducts(accessToken)]).then(json => {
		dispatch({
			type: "INIT_CATALOG",
			categories: json[0].data,
			products: json[1].data,
		});
	}).catch(() => {
		dispatch({
			type: "INIT_CATALOG",
			categories: ["ALL"],
			products: [],
		});
	});
};

export const setSortBy = (sortBy) => {
	return {
		type: "SET_SORTING",
		sortBy: sortBy,
	}
};

export const clearAllMetadata = () => {
	return {
		type: "CLEAR_ALL",
	}
};