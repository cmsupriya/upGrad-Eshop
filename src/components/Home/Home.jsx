import { React, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Home.css";
import Auth from "../../common/hooks/useAuth";

const Home = () => {
	const {AuthCtx} = Auth();

	return (
		<Box sx={{flexGrow: 1}}>
			<Grid container spacing={1}>
				<Grid container item spacing={3} className="container">
					<Grid item xs={12}>
						<div>
						</div>
					</Grid>
					<Grid item xs={12}>
						<div>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;