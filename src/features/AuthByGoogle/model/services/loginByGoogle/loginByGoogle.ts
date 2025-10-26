import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "i18next";
import type { ThunkConfig } from "@/app/providers/StoreProvider";
import type { User } from "@/entities/User";
import { userActions } from "@/entities/User";
import { AuthService } from "@/shared/api/authService";
import {
	ACCESS_TOKEN_LOCAL_STORAGE_KEY,
	REFRESH_TOKEN_LOCAL_STORAGE_KEY,
	USER_LOCAL_STORAGE_KEY,
} from "@/shared/const/localstorage";

interface loginByGoogleProps {
	token: string;
}

export const loginByGoogle = createAsyncThunk<User, loginByGoogleProps, ThunkConfig<string>>(
	"login/loginByGoogle",
	async (authData, thunkAPI) => {
		const { rejectWithValue, dispatch } = thunkAPI;

		try {
			const response = await AuthService.google(authData.token);
			if (!response.data) {
				throw new Error("No user data");
			}

			const user = {
				id: response.data.id,
				username: response.data.username,
			};

			localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, response.data.accessToken);
			localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, response.data.refreshToken);

			localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
			dispatch(userActions.setAuthData(user));

			return response.data;
		} catch (error) {
			console.log("server sdox", error);
			return rejectWithValue(i18n.t("Вы ввели неверный логин или пароль"));
		}
	}
);
