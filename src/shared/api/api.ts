import axios from "axios";
import { AuthService } from "@/shared/api/authService";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../const/localstorage";

export const $api = axios.create({
	baseURL: __API__,
	// withCredentials: true,
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

	console.log("URL", config.url);
	if (config.url?.includes("auth/") && !config.url.includes("auth/refresh")) {
	} else if (config.headers && token) {
		console.log("подставляем токен");
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

$api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url.includes("/auth/refresh")
		) {
			originalRequest._retry = true;

			try {
				await AuthService.refresh();
				const newToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
				if (newToken) {
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return $api(originalRequest);
				} else {
					console.error("Не удалось получить новый токен.");
				}
			} catch (err) {
				console.error("Ошибка обновления токена", err);
			}
		}

		return Promise.reject(error);
	}
);
