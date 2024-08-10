export const fetchAllProducts = (accessToken) => {
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	fetch('http://localhost:8080/api/products', {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.json().then((json) => {
			if(response.ok) {
				promiseResolveRef({
					data: json,
					response: response,
				});
			} else {
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
};

export const deleteProduct = (id, accessToken) => {
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	fetch('http://localhost:8080/api/products/'+id, {
		method: 'DELETE',
		headers: {
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.text().then(() => {
			if(response.ok) {
				promiseResolveRef({
					response: response,
				});
			} else {
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
};

export const viewProduct = (id, accessToken) => {
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	fetch('http://localhost:8080/api/products/'+id, {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.json().then((json) => {
			if(response.ok) {
				promiseResolveRef({
					value: json,
					response: response,
				});
			} else {
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
};