import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import useAuth from "../../common/hooks/useAuth";
import {useContext} from "react";
import { clearAllMetadata } from '../../common/store/actions/metadataAction'
import {connect} from "react-redux";

const Logout = ({sx, resetMetadata}) => {

	const {AuthCtx} = useAuth();
	const {logout} = useContext(AuthCtx);

	if(sx === null || sx === undefined) {
		sx = {};
	}
	const navigate = useNavigate();

	let doLogout = () => {
		resetMetadata();
		logout().then(() => {
			navigate("/login");
		});
	}

	return (
		<Button sx={sx}
				variant="contained"
				color="secondary"
				onClick={() => doLogout()}>
			LOGOUT
		</Button>
	);
};

const mapStateToProps = (state) => {
	return {
		sortBy: state.metadata.selectedSortBy,
		category: state.metadata.selectedCategory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetMetadata: () => dispatch(clearAllMetadata()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);