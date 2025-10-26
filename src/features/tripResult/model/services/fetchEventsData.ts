import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkConfig } from "@/app/providers/StoreProvider";
import type { BuildRouteParams, TripRouteSchema } from "../../model/types/TripRouteSchema.ts";

export const fetchEventsData = createAsyncThunk<TripRouteSchema, BuildRouteParams, ThunkConfig<string>>(
	"tripResult/buildRoute",
	async (params, thunkApi) => {
		const { extra, rejectWithValue } = thunkApi;

		try {
			const response = await extra.api.post<TripRouteSchema>("/api/routes/generate", params);

			if (!response.data) {
				throw new Error("Пустой ответ от сервера");
			}

			return response.data;
		} catch (e) {
			console.error("Ошибка при построении маршрута:", e);
			return rejectWithValue("Не удалось построить маршрут");
		}
	}
);
