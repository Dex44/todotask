
import axios from "axios";

// import jwt_decode from "jwt-decode";
import { ApiConstants } from "./Constant";

const mode = (type) => {
	switch (type) {
		case "development":
			return ApiConstants.apiBaseUrl;
		default:
			//return development api
			return ApiConstants.apiBaseUrl;
	}
};
const defaultOptions = {
	baseURL: mode(process.env.REACT_APP_CUSTOM_ENV),
	
	method: "get",
	headers: {
		"Content-Type": "application/json",
	},
};

// Create instance
let instance = axios.create(defaultOptions);
instance.interceptors.request.use(
    function (config) {
		// if (token) {
		// 	config.headers["Authorization"] = `Bearer ${token}`;
		// } else {
		// 	delete config.headers["Authorization"];
		// }
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// instance.interceptors.response.use(
// 	(response) => {
// 		return Promise.resolve(response);
// 	},
// 	(error) => {
// 		if (error.message === "Network Error" && !error.response) {
// 		}
// 		if (
// 			401 === error.response.status &&
// 			error.response.data.result.TYPE === "INVALID_TOKEN"
// 		) {
// 			// store.dispatch(setLogout());
// 		}

// 		if (error) {
// 			return Promise.reject(error);
// 		}
// 	}
// );

// export const getToken = () => {
// 	const { token } = store.getState().global;
// 	if (token) {
// 		try {
// 			const JWT = jwt_decode(token);
// 			const currentDate = Math.round(new Date().getTime() / 1000);
// 			if (JWT && JWT.exp > currentDate) {
// 				return token;
// 			}
// 			return null;
// 		} catch (error) {
// 			return null;
// 		}
// 	}
// 	return null;
// };

// export const checkToken = (token) => {
// 	try {
// 		const JWT = jwt_decode(token);
// 		const currentDate = Math.round(new Date().getTime() / 1000);
// 		if (JWT && JWT.exp > currentDate) {
// 			return JWT;
// 		}
// 		return null;
// 	} catch (error) {
// 		return null;
// 	}
// };

export default instance;
