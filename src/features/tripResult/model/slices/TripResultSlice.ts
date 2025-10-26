import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchEventsData } from "@/features/tripResult/model/services/fetchEventsData";
import type { TripResultSchema, TripRoute } from "../types/TripRouteSchema";

const initialState: TripResultSchema = {
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const tripResultSlice = createSlice({
	name: "tripResult",
	initialState,
	reducers: {
		clearTripResult: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEventsData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchEventsData.fulfilled, (state, action: PayloadAction<TripRoute>) => {
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
