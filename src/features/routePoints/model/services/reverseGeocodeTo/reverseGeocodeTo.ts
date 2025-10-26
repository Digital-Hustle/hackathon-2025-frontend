import { createAsyncThunk } from "@reduxjs/toolkit";
import { reverseGeocodeApi } from "@/shared/api/reverseGeocodeApi.ts";

export const reverseGeocodeTo = createAsyncThunk(
	"routePoints/reverseGeocodeTo",
	async (coordinates: [number, number], thunkAPI) => {
		const address = await reverseGeocodeApi(coordinates);

		if (!address) {
			return thunkAPI.rejectWithValue("Не удалось определить адрес по координатам");
		}

		return address;
	}
);
