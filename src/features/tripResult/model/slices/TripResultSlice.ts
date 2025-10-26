import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchEventsData } from "@/features/tripResult/model/services/fetchEventsData.ts";
import type { TripResultSchema, TripRouteSchema } from "../types/TripRouteSchema.ts";

const initialState: TripResultSchema = {
	data: null,
	isLoading: false,
	error: null,
};

export const tripResultSlice = createSlice({
	name: "tripResult",
	initialState,
	reducers: {
		// Можно добавить очистку, если нужно
		clearTripResult: (state) => {
			state.data = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEventsData.pending, (state) => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(fetchEventsData.fulfilled, (state, action: PayloadAction<TripRouteSchema>) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchEventsData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = (action.payload as string) || "Не удалось построить маршрут";
			});
	},
});

export const { actions: tripResultActions } = tripResultSlice;
export const { reducer: tripResultReducer } = tripResultSlice;
