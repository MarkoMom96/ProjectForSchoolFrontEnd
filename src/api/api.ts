import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiConfig } from "../config/api.config";

export interface ApiResponse {
	status: "ok" | "error" | "login";
	data: any;
}
export function saveToken(role: string, token: string) {
	localStorage.setItem(`api_token_${role}`, token);
}
export function saveRefreshToken(role: string, token: string) {
	localStorage.setItem(`api_refresh_token_${role}`, token);
}
export function getRole(): string | null {
	return localStorage.getItem("role");
}
export function saveRole(role: string) {
	return localStorage.setItem("role", role);
}
export function saveUserInfo(info: { forename: string; surname: string }) {
	localStorage.setItem("forename", info.forename);
	localStorage.setItem("surname", info.surname);
}
export function getUserInfo() {
	const res = {
		forename: localStorage.getItem("forename"),
		surname: localStorage.getItem("surname"),
	};
	return res;
}
function getToken(role: string): string {
	const token = localStorage.getItem(`api_token_${role}`);
	return "Berer " + token;
}

function getRefreshToken(role: string): string {
	const token = localStorage.getItem(`api_refresh_token_${role}`);
	return token + "";
}

export default function api(
	path: string,
	method: "get" | "post" | "patch",
	body: any | undefined,
	role: "student" | "profesor" = "profesor"
) {
	return new Promise<ApiResponse>(resolve => {
		const requestData = {
			method: method,
			url: path,
			baseURL: ApiConfig.API_URL,
			data: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				Authorization: getToken(role),
			},
		};
		console.log("Token: ", getToken(role));
		axios(requestData)
			.then(res => responseHandler(res, resolve))
			.catch(async err => {
				if (err.response.status === 401) {
					const newToken = await refreshToken(role);
					console.log("newToken: ", newToken);
					if (!newToken) {
						const response: ApiResponse = {
							status: "login",
							data: null,
						};

						return resolve(response);
					}
					saveToken(role, newToken);
					requestData.headers["Authorization"] = getToken(role);
					return await repeatRequest(requestData, resolve);
				}

				const response: ApiResponse = {
					status: "error",
					data: err,
				};
				return resolve(response);
			});
	});

	async function responseHandler(
		res: AxiosResponse<any>,
		resolve: (value: ApiResponse) => void
	) {
		if (res.status < 200 || res.status >= 300) {
			const response: ApiResponse = {
				status: "error",
				data: res.data,
			};
			console.log("error: ");
			return resolve(response);
		}

		const response: ApiResponse = {
			status: "ok",
			data: res.data,
		};

		resolve(response);

		//
	}

	async function refreshToken(
		role: "student" | "profesor"
	): Promise<string | null> {
		const path: string = `auth/${role}/refresh`;
		const data = {
			token: getRefreshToken(role),
		};
		const refreshTokenRequestData: AxiosRequestConfig = {
			method: "post",
			url: path,
			baseURL: ApiConfig.API_URL,
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const refreshTokenResponse: {
			data: {
				token: string | undefined;
			};
		} = await axios(refreshTokenRequestData);
		console.log("refreshRes: ", refreshTokenResponse);
		if (!refreshTokenResponse.data.token) return null;
		return refreshTokenResponse.data.token;
	}
	async function repeatRequest(
		requestData: AxiosRequestConfig,
		resolve: (value: ApiResponse) => void
	) {
		axios(requestData)
			.then(res => {
				let response: ApiResponse;
				if (res.status === 401) {
					response = {
						status: "login",
						data: null,
					};
				} else {
					response = {
						status: "ok",
						data: res,
					};
				}

				return resolve(response);
			})
			.catch(err => {
				const response: ApiResponse = {
					status: "error",
					data: err,
				};

				return resolve(response);
			});
	}
}
