import { useContext, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useService from "../../common/hooks/useService";

const ShowMessage = () => {

	const [showInfo, setShowInfo] = useState(false);
	const {ServicesCtx} = useService();
	const {message, level, showMessage} = useContext(ServicesCtx);

	useEffect(() => {
		if(message === null || level === null) {
			setShowInfo(false);
		} else {
			setShowInfo(true);
		}
	}, [message, level]);

	let hideAndResetMessage = () => {
		setShowInfo(false);
		showMessage(null, null);
	};

	return (
		<Snackbar
			anchorOrigin={{vertical: "top", horizontal: "right"}}
			open={showInfo}
			autoHideDuration={4000}
			onClose={() => hideAndResetMessage()}
		>
			<Alert onClose={() => hideAndResetMessage()} severity={level} sx={{width: '100%'}}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default ShowMessage;