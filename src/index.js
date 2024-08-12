import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { Provider } from "react-redux";
import store from "./common/store";
import useAuth from './common/hooks/useAuth';
import useService from './common/hooks/useService';
import config from './config';

const Index = () => {

	const {AuthProvider} = useAuth();
	const {ServicesProvider} = useService();

	return (
		<AuthProvider>
			<ServicesProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</ServicesProvider>
		</AuthProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Index />
);