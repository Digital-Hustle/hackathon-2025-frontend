import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "i18next";
import type { ThunkConfig } from "@/app/providers/StoreProvider";
import type { User } from "@/entities/User";
import { loginByUsername } from "@/features/AuthByUsername/model/services/loginByUsername/loginByUsername"; // импортируем ваш AuthService
import { AuthService } from "@/shared/api/authService";

interface RegistrationProps {
	username: string;
	password: string;
	confirmPassword: string;
}

export const registration = createAsyncThunk<User, RegistrationProps, ThunkConfig<string>>(
	"register/registration",
	async (authData, thunkAPI) => {
		const { rejectWithValue, dispatch } = thunkAPI;

		try {
			const response = await AuthService.registration(
				authData.username,
				authData.password,
				authData.confirmPassword
			);

			if (!response.data) {
				throw new Error("No user data");
			}

			await dispatch(loginByUsername({ username: authData.username, password: authData.password }));

			return response.data;
		} catch (error) {
			console.error("че", error);
			return rejectWithValue(i18n.t("Ошибка регистрации"));
		}
	}
);
