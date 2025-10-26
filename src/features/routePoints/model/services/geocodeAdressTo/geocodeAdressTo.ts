import { createAsyncThunk } from "@reduxjs/toolkit";
import { geocodeAddressApi } from "@/shared/api/geocodeApi";

export const geocodeFromAddressTo = createAsyncThunk(
	"routePoints/geocodeFromAddressTo",
	async (address: string, thunkAPI) => {
		const coords = await geocodeAddressApi(address);

		if (!coords) {
			return thunkAPI.rejectWithValue("Адрес не найден");
		}

		return coords;
	}
);
